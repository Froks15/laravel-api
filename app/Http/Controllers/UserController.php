<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Auth;
    use App\User;
    use Response;
    use Illuminate\Support\Facades\DB;


    class UserController extends Controller
    {
    public function __construct()
    {
        $this->content = array();
    }
    public function login()
    {
        
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')]))
        {
            $user = Auth::user();
            $this->content['user'] = $user;
            $this->content['token'] =  $user->createToken('App')->accessToken;
            $status = 200;
        }
        else
        {
            $this->content['error'] = "Bad pass or login";
            $status = 401;
        }
            
        return response()->json($this->content, $status);    
    }

    public function logout(Request $request){
        Auth::logout();
        return response()->json(['message' => 'success']);
    }

    public function reg(Request $request)
    {

        $request->validate([
            'name' => 'required|min:6|max:50',
            'email' => 'required|min:5|email',
            'user_id' => 'required',
            'category_id' => 'required',
        ]);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['user' => $user]);
  
    }

    public function isAdmin(Request $request)
    {
        return response()->json(['role'=>Auth::user()->role])->header('Accept', 'application/json');
    }

    public function details()
    {
        return response()->json(['user'=>Auth::User()])->header('Accept', 'application/json');
    }

    public function show(Request $request)
    {
        $user = User::findOrFail($request->id);
        return response()->json(['user'=>$user])->header('Accept', 'application/json');
    }
 }