<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class SellerMiddleware
{
    public function handle(Request $request, Closure $next){

    
        if (Auth::check() && Auth::user()->user_type === 'seller') {
            return $next($request);
        }
return Inertia::render('Errors/403')->toResponse($request)->setStatusCode(Response::HTTP_FORBIDDEN);
        }

        
    }
