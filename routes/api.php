<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Auth::routes();

Route::post('auth', 'UserController@login');
Route::post('reg', 'UserController@reg');
Route::get('logout', 'UserController@logout');

Route::resource('posts', 'PostController',
                ['only' => ['index', 'show']]);

Route::resource('comments', 'CommentController',
                ['only' => ['index', 'show']]);

Route::resource('categories', 'CategoryController',
                ['only' => ['index', 'show']]);



Route::group(['middleware' => ['auth:api']], function(){

  Route::get('/user', 'UserController@details');

  Route::resource('posts', 'PostController',
                  ['only' => ['create', 'store', 'update', 'destroy']]);

  Route::resource('comments', 'CommentController',
                  ['only' => ['create', 'store', 'update', 'destroy']]);
  
  Route::resource('categories', 'CategoryController',
                  ['only' => ['create', 'store', 'update', 'destroy']]);
});