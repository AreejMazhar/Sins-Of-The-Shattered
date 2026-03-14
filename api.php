<?php
require_once 'config.php';

// CORS and response headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$entity = isset($_GET['entity']) ? preg_replace('/[^a-z_]/', '', strtolower($_GET['entity'])) : '';
$action = isset($_GET['action']) ? $_GET['action'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : '';

// Allowed entities → table name + id column
$allowed = [
    'quests'          => ['table' => 'quests',          'idCol' => 'id'],
    'characters'      => ['table' => 'characters',      'idCol' => 'id'],
    'items'           => ['table' => 'items',           'idCol' => 'id'],
    'npcs'            => ['table' => 'npcs',            'idCol' => 'id'],
    'sessions'        => ['table' => 'sessions',        'idCol' => 'id'],
    'discoveries'     => ['table' => 'discoveries',     'idCol' => 'id'],
    'gallery_art'     => ['table' => 'gallery_art',     'idCol' => 'id'],
    'gallery_writing' => ['table' => 'gallery_writing', 'idCol' => 'id'],
    'monsters'        => ['table' => 'monsters',        'idCol' => 'id'],
];

if (!isset($allowed[$entity])) {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown entity: ' . $entity]);
    exit();
}

$tableName = $allowed[$entity]['table'];
$idCol = $allowed[$entity]['idCol'];
$conn = getDB();

// ────────────────────────────────────────────
// GET  →  return all rows as JSON array
// ────────────────────────────────────────────
if ($method === 'GET') {
    $orderBy = '';
    if ($entity === 'sessions')
        $orderBy = 'ORDER BY sessionNumber DESC';

    $result = $conn->query("SELECT * FROM `$tableName` $orderBy");
    if (!$result) {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
        $conn->close();
        exit();
    }

    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = decodeRow($entity, $row);
    }
    echo json_encode($rows);

    // ────────────────────────────────────────────
// POST  →  upsert a single record
// ────────────────────────────────────────────
} elseif ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON body']);
        $conn->close();
        exit();
    }

    // Fetch valid columns for this table to prevent errors from extra JS properties
    $colResult = $conn->query("SHOW COLUMNS FROM `$tableName`");
    $validCols = [];
    while ($c = $colResult->fetch_assoc()) {
        $validCols[] = $c['Field'];
    }

    $encoded = encodeRow($entity, $body);

    $filteredEncoded = [];
    foreach ($encoded as $key => $val) {
        if (in_array($key, $validCols)) {
            $filteredEncoded[$key] = $val;
        }
    }

    if (empty($filteredEncoded)) {
        http_response_code(400);
        echo json_encode(['error' => 'No valid columns provided']);
        $conn->close();
        exit();
    }

    $cols = array_keys($filteredEncoded);
    $vals = array_values($filteredEncoded);

    // Build INSERT … ON DUPLICATE KEY UPDATE
    $placeholders = implode(', ', array_fill(0, count($cols), '?'));
    $colList = implode(', ', array_map(fn($c) => "`$c`", $cols));
    $updateParts = implode(', ', array_map(fn($c) => "`$c`=VALUES(`$c`)", $cols));
    $types = str_repeat('s', count($cols));

    $sql = "INSERT INTO `$tableName` ($colList) VALUES ($placeholders) ON DUPLICATE KEY UPDATE $updateParts";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
        $conn->close();
        exit();
    }
    $stmt->bind_param($types, ...$vals);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
    $stmt->close();

    // ────────────────────────────────────────────
// DELETE  →  delete by id
// ────────────────────────────────────────────
} elseif ($method === 'DELETE') {
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing id']);
        $conn->close();
        exit();
    }
    $stmt = $conn->prepare("DELETE FROM `$tableName` WHERE `$idCol` = ?");
    $stmt->bind_param('s', $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();

// ────────────────────────────────────────────
// Helpers: encode JS objects → DB strings
// ────────────────────────────────────────────
function encodeRow($entity, $data)
{
    $jsonCols = getJsonCols($entity);
    $row = [];
    foreach ($data as $key => $val) {
        if (in_array($key, $jsonCols)) {
            $row[$key] = json_encode($val, JSON_UNESCAPED_UNICODE);
        } elseif (is_bool($val)) {
            $row[$key] = $val ? '1' : '0';
        } elseif (is_null($val)) {
            $row[$key] = '';
        } else {
            $row[$key] = (string) $val;
        }
    }
    return $row;
}

function decodeRow($entity, $row)
{
    $jsonCols = getJsonCols($entity);
    $boolCols = getBoolCols($entity);
    $intCols = getIntCols($entity);
    $out = [];
    foreach ($row as $key => $val) {
        if (in_array($key, $jsonCols)) {
            $decoded = json_decode($val, true);
            $out[$key] = $decoded !== null ? $decoded : [];
        } elseif (in_array($key, $boolCols)) {
            $out[$key] = (bool) (int) $val;
        } elseif (in_array($key, $intCols)) {
            $out[$key] = (int) $val;
        } else {
            $out[$key] = $val;
        }
    }
    return $out;
}

function getJsonCols($entity)
{
    $map = [
        'quests' => ['tasks', 'objectives'],
        'characters' => ['quotes'],
        'items' => [],
        'npcs' => [],
        'sessions' => [],
        'discoveries' => [],
    ];
    return $map[$entity] ?? [];
}

function getBoolCols($entity)
{
    $map = [
        'quests'   => ['isMainQuest'],
        'items'    => ['inPocketDimension'],
        'monsters' => ['isBoss'],
    ];
    return $map[$entity] ?? [];
}

function getIntCols($entity)
{
    $map = [
        'quests' => ['level'],
        'characters' => ['level', 'hp', 'ac', 'gold'],
        'sessions' => ['sessionNumber'],
        'items' => ['count'],
    ];
    return $map[$entity] ?? [];
}
