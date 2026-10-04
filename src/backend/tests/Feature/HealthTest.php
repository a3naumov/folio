<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use RuntimeException;
use Tests\TestCase;

class HealthTest extends TestCase
{
    public function test_liveness_does_not_require_a_database(): void
    {
        DB::shouldReceive('select')->never();

        $this->get('/up')->assertOk();
    }

    public function test_readiness_queries_a_real_database_connection(): void
    {
        $this->getJson('/api/health')
            ->assertOk()
            ->assertExactJson(['status' => 'ok', 'database' => 'connected']);
    }

    public function test_database_failure_returns_service_unavailable_without_details(): void
    {
        DB::shouldReceive('select')->once()->with('SELECT 1')
            ->andThrow(new RuntimeException('Private database credentials'));

        $this->getJson('/api/health')
            ->assertStatus(503)
            ->assertExactJson(['status' => 'unavailable', 'database' => 'unavailable']);
    }

    public function test_unknown_api_routes_return_json(): void
    {
        $this->get('/api/missing')
            ->assertNotFound()
            ->assertHeader('Content-Type', 'application/json');
    }
}
