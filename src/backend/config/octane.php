<?php

// Octane merges its default listeners and warm bindings with these settings.
return [
    'server' => env('OCTANE_SERVER', 'frankenphp'),
    'https' => env('OCTANE_HTTPS', false),
    'max_execution_time' => 30,
    'state_file' => '/tmp/folio-octane-server-state.json',
    'watch' => [
        'app/**/*.php',
        'bootstrap/app.php',
        'bootstrap/providers.php',
        'config/**/*.php',
        'database/**/*.php',
        'public/**/*.php',
        'resources/**/*.php',
        'routes/**/*.php',
        'composer.lock',
    ],
];
