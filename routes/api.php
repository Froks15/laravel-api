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

  Route::get('/myProfile', 'UserController@details');
  Route::get('/users/{id}', 'UserController@show');
  Route::delete('/users/{id}', 'UserController@destroy');
  Route::put('/users/{id}', 'UserController@update');
  Route::get('/isAdmin', 'UserController@isAdmin');

  Route::resource('posts', 'PostController',
                  ['only' => ['create', 'store', 'update', 'destroy']]);

  Route::get('/myPosts', 'PostController@myPosts');

  Route::resource('comments', 'CommentController',
                  ['only' => ['create', 'store', 'update', 'destroy']]);
  
  Route::resource('categories', 'CategoryController',
                  ['only' => ['create', 'store', 'update', 'destroy']]);
});



