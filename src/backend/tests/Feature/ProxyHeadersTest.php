<?php

namespace Tests\Feature;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ProxyHeadersTest extends TestCase
{
    public function test_proxy_headers_preserve_external_https_urls_and_client_ip(): void
    {
        Route::get('/api/proxy-test', function (Request $request): array {
            return [
                'secure' => $request->isSecure(),
                'client' => $request->ip(),
                'url' => url('/api/health'),
            ];
        });

        $this->withServerVariables(['REMOTE_ADDR' => '172.18.0.3'])
            ->getJson('/api/proxy-test', [
                'X-Forwarded-For' => '198.51.100.20',
                'X-Forwarded-Host' => 'folio.example.com',
                'X-Forwarded-Port' => '443',
                'X-Forwarded-Proto' => 'https',
            ])
            ->assertOk()
            ->assertExactJson([
                'secure' => true,
                'client' => '198.51.100.20',
                'url' => 'https://folio.example.com/api/health',
            ]);
    }
}
