<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PostController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json(['posts'=>Post::select('id', 'title', 'text')->get()]);
    }

    public function myPosts()
    {
        $id = Auth::id();
        return response()->json(['posts'=>Post::select('id', 'title', 'text')->where('user_id', $id)->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $request->validate([
            'title' => 'required|min:10|max:255',
            'text' => 'required|min:10',
            'user_id' => 'required',
        ]);

        $post = new Post;
        $post->title = $request->title;
        $post->text = $request->text;
        $post->user_id = $request->user_id;
        $post->category_id = $request->category_id;
        $post->save();

        return $post;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $post->category;
        $post->user;
        $post->comments;
        return $post;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
        $request->validate([
            'title' => 'required|min:10|max:255',
            'text' => 'required|min:10',
            'user_id' => 'required',
        ]);

        $post->title = $request->title;
        $post->text = $request->text;
        $post->user_id = $request->user_id;
        $post->category_id = $request->category_id;
        $post->save();

        return $post;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
        $post->delete();
        return $post . ' deleted';
    }
}
