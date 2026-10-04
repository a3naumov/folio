<?php

declare(strict_types=1);

$root = dirname(__DIR__, 2);
$template = file_get_contents($root.'/.env.example');
$path = $root.'/.env';
$contents = is_file($path) ? file_get_contents($path) : $template;

preg_match_all('/^([A-Z_]+)=(.*)$/m', $template, $defaults, PREG_SET_ORDER);
foreach ($defaults as [, $name, $value]) {
    if (! preg_match('/^'.preg_quote($name, '/').'=/m', $contents)) {
        $contents .= "\n{$name}={$value}\n";
    }
}

foreach (['APP_KEY', 'POSTGRES_PASSWORD'] as $name) {
    $pattern = '/^'.preg_quote($name, '/').'=[ \t]*(?:""|\'\')?[ \t]*$/m';
    $contents = preg_replace_callback($pattern, static function () use ($name): string {
        $value = $name === 'APP_KEY'
            ? 'base64:'.base64_encode(random_bytes(32))
            : bin2hex(random_bytes(32));

        return $name.'='.$value;
    }, $contents);
}

// Replace the previous single-service default without changing custom file lists.
$contents = preg_replace('/^COMPOSE_FILE=compose\.yaml[ \t]*$/m', 'COMPOSE_FILE=compose.yaml:compose.dev.yaml', $contents);

if (file_put_contents($path, rtrim($contents)."\n", LOCK_EX) === false) {
    throw new RuntimeException('Unable to write .env.');
}
chmod($path, 0600);
echo "Local configuration initialized; existing secrets were preserved.\n";
