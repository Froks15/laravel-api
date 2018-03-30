<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Comment::all();
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


        $request->validate([
            'text' => 'required|max:250',
            'user_id' => 'required',
            'post_id' => 'required',
        ]);
        //
        $user_id = Auth::id(); 
        
        $comment = new Comment;
        $comment->text = $request->text;
        $comment->user_id = $user_id;
        $comment->post_id = $request->post_id;
        $comment->save();

        return $comment;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
        return $comment;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        //

        $request->validate([
            'text' => 'required|max:250',
            'user_id' => 'required',
            'post_id' => 'required',
        ]);

        $comment->text = $request->text;
        $comment->user_id = $request->user_id;
        $comment->post_id = $request->post_id;
        $comment->save();

        return $comment;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        //
        $comment->delete();
        return $comment . ' deleted';
    }
}
