# 【Fullstack procedure】
#### ✭Folder : A(project), B(client), C(api(server))  
## ◼︎ React

1. create project folder A(fullstack)   
2. install react at B(client) folder  
  > A> `npm create vite@latest (B)`  
  > A> `cd B`  
3. install tailwind as below procedure(at B)         
  - search 'tailwind vite' in google(https://tailwindcss.com)    
  - select 'Installing Tailwind CSS with vite' site  
  - confirm 'using Vite' is selected, and follow the steps in order  
4. organize the existing files at B folder 
  - delete: App.css, public/svg, src/assets/svg  
  - change: App.jsx(in "src" folder)  
5. make git in A folder and backup to git repository  
  > `cd ..`  
  > `A> git init`  
  > `A> git add .`   
  > `A> git commit -m "first commit"`  
  - go to github site and create new repository  
  - copy command lines and execute command at terminal(A folder)  
  - see the git push result at github site repository  
<hr/>  

6. route & create pages(B folder(client))    
  - install library   
    > `npm i react-router-dom`  
  - create "pages" folder in "src" folder of B(client), and make pages(Home.jsx, etc)  
  - modify app.jsx  
```javascript
    import { BrowserRouter, Routes, Route } from 'react-router-dom';  
    import Home from './pages/Home';    
    function App() {
      return (
        <BrowserRouter>    
          <Routes>    
            <Route path="/" element={<Home />} />    
          </Routes>    
        </BrowserRouter>  
      )
    }
    export default App
```
<hr/>

7. create "components" folder in "src" folder, and make components(Header.jsx)  
  - googling 'flowbite react'(https://flowbite-react.com/), go to 'Quickstart' and excute the 'Adding to an existing project' command  
  - install react-icons(npm i react-icons) 
  - edit Header.jsx 
  - modify app.jsx (include "Header" component)   
```javascript
  ...
  <BrowserRouter>  
    <Header />  
    <Routes>  
      <Route path="/" element={} />   
    </Routes>   
  </BrowserRouter> 
```
<hr/>

## ◼︎ Express   
8. go to project folder A(fullstack)  
9. init npm : A>`npm init -y`  
10. install express(in A folder)  
  > A>`npm i express`  
11. install nodemon : A>`npm i nodemon -D`   
  - if globally installed before, it doesn't need to install again  
12. modify package.json  
  ```json
  {
    "main": "api/index.js",
    "scripts": {
      "dev": "nodemon api/index.js",
      "start": "node api/index.js"},
    "type": "module" 
  }
  ```
13. move ".gitignore" in B(client) to A     
  - check if "node_modules", ".env" in ".gitignore"  
14.  create server folder C(api) in A      
15.  make "index.js" at C folder  
```javascript
  import express from 'express';    
  const app = express();    
  app.use(express.json());  
  const port = 3000;   
  app.listen(port, () => {    
  console.log(`Server is running on port ${port}`) });  
```
<hr/>

## ◼︎ MongoDB   
16.  At MongoDB site, create new project  
  - input project name(fullstack)   
  - change or confirm username, password and click create user  
  - choose connectton method → select Drivers  
  - At mongoDB site, select NETWORK ACCESS, IP Acess List, Add IP Adress    
    Access List Entry: 0.0.0.0, Comment:test   
17.  create ".env" file in A(fullstack)  
```json
  MONGO = "Mongodb_site_url(add project name before '?')"
```  
18. install mongoose at A(fullstack)   
  > A> `npm i mongoose`  
19.   install "dotenv" at A(fullstack)  
  > A> `npm i dotenv`  
20. Add connection DB in "index.js"  
```javascript
  import mongoose from 'mongoose';  
  import dotenv from 'dotenv';  
  dotenv.config();  
  mongoose  
    .connect(process.env.MONGO)  
    .then(() => {  
      console.log('Connected to MongoDB!');})  
    .catch((err) => {  
      console.error('Error connecting to MongoDB:', err);});
```  
21.  add ".env" in ".gitignore"   
  <hr/>  

22. create "models" folder in C folder(api) and make schema and model(user.model.js) 
```javascript  
  import mongoose from 'mongoose';    
  const userSchema = new mongoose.Schema(       
  {      
    username: {      
      type: String,      
      required: true,      
      unique: true,      
    },      
    password: {     
      type: String,    
      required: true,   
    },   
  },   
  { timestamps: true },   
  );   
  const User = mongoose.model('User', userSchema);   
  export default User;     
```
<hr/>

- create routes folder and route file(user.route.js) in C folder(api)
```javascript   
  import express from 'express';   
  import { test } from '../controllers/user.controller.js';   
  const router = express.Router();   
  router.get('/test', test);   
  export default router;     
```
- create controllers folder and controller file(user.controller.js) in C folder(api)  
```javascript
  export const test = (req, res) => {   
  res.json({ message: 'Test API route working!' });   
  }; 
``` 
- connect routes in index.js   
```javascript
  import userRouter from './routes/user.route.js';   
  app.use('/api/users', userRouter);
```  
<hr />

23. auth(signup) procedure (server(C)/Insomnia/MongoDB)  
- make auth.route.js in routes folder  
```javascript
  import express from 'express';  
  import { signup } from '../controllers/auth.controller.js';    
  const router = express.Router();   
  router.post('/signup', signup);    
  export default router;
```    
- make auth.controller.js in controllers folder  
```javascript
  import User from '../models/user.model.js';  
  export const signup = async (req, res) => {  
    const { username, email, password } = req.body;  
    const newUser = new User({ username, email, password });  
    try {  
      await newUser.save();  
      res.status(201).json({ message: 'User created successfully!' });  
    } catch (err) {  
      console.error('Error creating user:', err);  
    return res.status(500).json({ message: 'Internal server error' });  
    }   
  };
```   
- connect auth.route.js to index.js   
```javascript
  import authRouter from './routes/auth.route.js';  
  app.use('/api/auth', authRouter);  
```
- send POST request at Insomnia
  > POST : localhost:3000/api/auth/signup  
  > BODY(JSON)  
```json
    {  
	    "username" : "test",
	    "email" : "test@test.com",
	    "password" : "test1"
	  }
```  
- in Mongo DB site, check new user is created   
- install bcryptjs at A(fullstack) for password encryption  
  > A> `npm i bcryptjs`  
- modify auth.controller.js  
```javascript
  import bcryptjs from 'bcryptjs';  
  export const signup = async (req, res) => {  
    const { username, email, password } = req.body;  
    const hashedPassword = bcryptjs.hashSync(password, 10);  
    const newUser = new User({ username, email, password: hashedPassword });
  }
```   
- send POST request at Insomnia for other user, and in Mongo DB site, check new user is created with encrypted password  
<hr/>  

24. middleware handling errors (Server(C))
- add middleware to handle errors in index.js
  ```javascript
  app.use((err, req, res, next) => {  
    const statusCode = err.statusCode || 500;  
    const message = err.message || 'Internal Server Error';  
    return res.status(statusCode).json({  
      success: false,  
      statusCode,  
      message,  
      });  
  }); 
  ```
- modify controller file(auth.controller.js)  
  ```javascript
  export const signup = async (req, res, next) => {  
    ...
    catch (err) {  
      next(err);  
    }  
  }; 
  ``` 
25. handling errors manually if needed (Server (C))
- make "utils" folder and "error.js"
```javascript
  export const errorHandler = (statusCode, message) => {  
    const error = new Error();  
    error.message = message;  
    error.statusCode = statusCode;  
  return error;  
  };
```  
- use if needed in controller or other file  
<hr/>

26. auth(sign-up) procedure  (Client (B))  
- make form in "SignUp.jsx" page 
```javascript
  import { useState } from 'react';  
  export default function SignUp() {  
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {  
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));  
    }; 
    const handleSubmit = async (e) => {  
      e.preventDefault();  
      const res = await fetch('/api/auth/signup', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json', 
        },  
        body: JSON.stringify(formData),  
      });  
      const data = await res.json();  
      setFormData({});  
    };
    return (  
    <div>  
      <h1>Sign Up</h1>  
        <form onSubmit={handleSubmit}>  
          <input id="username" onChange={handleChange} />  
          <input id="email" onChange={handleChange} />  
          <input id="password" onChange={handleChange} />  
          <button> Sign Up </button>  
        </form>  
    </div>  
    );  
  }
```   
- set proxy at vite.config.js  
```javascript
  server: {  
    proxy: {  
      '/api': {  
        target: 'http://localhost:3000',  
        secure: false,  
      },  
    },  
  },
```  
- run both frontend and backend :   
  > B(client)> `npm run dev`
  > A(server, not C)> `npm run dev`
- send Form message at Fronted(B)  and check if user is created in the DB  
<hr/>

27. loading & error handling (signUp.jsx)  
- set disalbed attribute when loading, and set error message and display when error. when normal, navigate to sign-in page 
```javascript
  import { Link, useNavigate } from 'react-router-dom'; 
  export default function SignUp() {  
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();  
    ...
    const handleSubmit = async (e) => {  
      e.preventDefault();  
      try {  
        setLoading(true); 
        const res = await fetch('/api/auth/signup', {  
          method: 'POST', 
          headers: {'Content-Type': 'application/json',},  
          body: JSON.stringify(formData)});  
        const data = await res.json();  
        if (data.success === false) {  
          setLoading(false);  
          setError(data.message);  
          return;}  
        setLoading(false);  
        setError(null);
        setFormData({});  
        navigate('/sign-in');  
      } catch (error) {  
        setLoading(false);  
        setError(error.message); 
      } 
      return (  
        ..
        <button disabled={loading}>  
          {loading ? 'Signing up...' : 'Sign Up'}  
        </button>  
        {error && (<div> {error} </div>)}  
        ...
      ) 
    }
  }  
  
```
<hr/>

28. create Footer components (client B)
- add Footer route in App.jsx  
```javascript
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
  <FooterCom />
</BrowserRouter>
```
- make Footer.jsx in components folder  
<hr/>

29. sign-in procedure (api(C))  
- install "jsonwebtoken" at A(fullstack)  
  > A> `npm i jsonwebtoken`  
- add sign-in function in "auth.controller.js"  
```javascript
  ...  
  import { errorHandler } from '../utils/error.js';  
  import jwt from 'jsonwebtoken';  
  ...
  export const signin = async (req, res, next) => {  
    const { email, password } = req.body;  
    try {  
      const validUser = await User.findOne({ email });  
      if (!validUser) {  
        return next(errorHandler(404, 'User not found!'));}  
      const isPasswordValid = bcryptjs.compareSync(password, validUser.password);  
      if (!isPasswordValid) {  
        return next(errorHandler(401, 'Invalid password!'));}  
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);  
      const { password: pass, ...rest } = validUser._doc;  
      res.cookie('access_token', token, {httpOnly: true,  
          expire: new Date(Date.now() + 1000 * 60 * 60 * 24)}) 
        .status(200).json(rest);  
    } catch (error) {next(error);} 
  }
```
- add 'signin" route to "auth.route.js"  
```javascript
  ... 
  import { signup, signin } from '../controllers/auth.controller.js';  
  router.post('/signin', signin);  
  ...
```  
- no coding in "index.js", because middleware is already included
```javascript
  import authRouter from './routes/auth.route.js';  
  app.use('/api/auth', authRouter);
```  
- at insomnia, try login and see the result(check if password is not included, and token is created )  
  > POST : lcalhost:3000/api/auth/signin  
  > BODY(JSON) :  
  > {"email" : "bbb@bbb.com", "password" : "bbb"}  
<hr />


30. make signin.jsx page in client(B), much like signUp.jsx(copy and modify) and test if it is logged-in 
<hr/>

31.  Redux(globally (data) state managing, substitute for useContext) : possibly use received data(`res.json(rest)`) from "auth.controller.js"(server) at every Client(B) pages    
- install redux toolkit at B(client)  
  > B> `npm i @reduxjs/toolkit react-redux`  
- create folder and file: src/redux/store.js  
- code store.js
```javascript  
  import { configureStore } from '@reduxjs/toolkit'; 
  export const store = configureStore({  
  reducer: {},  
  middleware: (getDefaultMiddleware) =>  
  getDefaultMiddleware({serializableCheck: false,}),  
  });  
```
- modify "main.jsx"   
```javascript
  import { Provider } from 'react-redux'; 
  import { store } from './redux/store';  
  ...  
  <Provider store={store}>  
  <App /> 
  </Provider>   
```
- create a Redux Static Slice  
   - make folder("user") in "redux" folder  
   - make "userSlice.js" in "user"  
  ```javascript
    import { createSlice } from '@reduxjs/toolkit';    
    const initialState = {  
      currentUser: null,  
      error: null,  
      loading: false,  
    };  
    export const userSlice = createSlice({  
      name: 'user',  
      initialState,  
      reducers: {  
        signInStart: (state) => {state.loading = true;},  
        signInSuccess: (state, action) => {  
          state.currentUser = action.payload;  
          state.loading = false;  
          state.error = null;  
        },  
        signInFailure: (state, action) => {  
          state.error = action.payload; 
          state.loading = false;  
        },  
      },  
    });  
    export const { signInStart, signInSuccess, signInFailure } = userSlice.actions; 
    export default userSlice.reducer;
  ```
- modify store.js  
```javascript
  ...  
  import userReducer from './user/userSlice';  
    ...  
    reducer: {user: userReducer,},  
    ...  
```
- using reducer by applying dispatch to various pages (signin.jsx)
```javascript
  ...  
  import { useDispatch, useSelector } from 'react-redux';  
  import {signInStart, signInSuccess, signInFailure,} from '../redux/user/userSlice';  
  export default function SignIn() {  
    ...  
    // const [error, setError] = useState(null);  
    // const [loading, setLoading] = useState(false);  
    const { error, loading } = useSelector((state) => state.user);  
    ...  
    const dispatch = useDispatch();  
    ...  
    const handleSubmit = async (e) => {  
      ...  
      try {  
        // setLoading(true);  
        dispatch(signInStart());  
        ...  
        if (data.success === false) {  
          // setLoading(false);  
          // setError(data.message);  
          dispatch(signInFailure(data.message));  
          return;  
        }  
        // setLoading(false);  
        // setError(null);  
        dispatch(signInSuccess(data));  
        ...  
      } catch (error) {   
        // setLoading(false);   
        // setError(error.message);   
        dispatch(signInFailure(error.message));  
      }  
    };
```   

32.  make Redux persist (retain data after page is refreshed)  
- install redux-persist at B(client)  
  > B> `npm i redux-persist`  
- modify "store.js" 
```javascript 
  ...  
  import { combineReducers, configureStore } from '@reduxjs/toolkit';  
  import { persistReducer, persistStore } from 'redux-persist';  
  import storage from 'redux-persist/lib/storage';  
  const rootReducer = combineReducers({user: userReducer,});  
  const persistConfig = {  
    key: 'root',
    storage: storageEngine,
    version: 1,};  
  const persistedReducer = persistReducer(persistConfig, rootReducer);  
  export const store = configureStore({  
   reducer: persistedReducer,  
   ...  
  });  
  ...  
  export const persistor = persistStore(store);  
```
- modify "main.jsx"  
```javascript
  ...  
  import { persistor, store } from './redux/store.js';  
  import { PersistGate } from 'redux-persist/integration/react';  
  createRoot(document.getElementById('root')).render(  
  <Provider store={store}>  
    <PersistGate loading={null} persistor={persistor}>  
      <App />  
    </PersistGate>  
  </Provider>,  
  );  
```
<hr/>

33. add google auth functionalty  
- make project at google firebase 
  - sign in and go to console
  - add project(unable google analystics)...click continue
  - add an app - web 
- install firebase at client server 
  > B> `npm i firebase`  
- copy SDK file and create firebase.js in src folder  
```javascript
  import { initializeApp } from 'firebase/app';
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'mean-blog-53182.firebaseapp.com',
    projectId: 'mean-blog-53182',
    storageBucket: 'mean-blog-53182.firebasestorage.app',
    messagingSenderId: '1043609418056',
    appId: '1:1043609418056:web:90e9c42ed3721804c89b7d',
    measurementId: 'G-WEM9TNG9G2',
  };
  export const app = initializeApp(firebaseConfig);
```
- hide api_key by creating .env file at client folder
  > `VITE_FIREBASE_API_KEY = "123"`
- at google firebase, click "continue to the console"
  - select authentication(security-authentication-login method)
  - select google, click enable, change project name, input gmail and save
- add OAuth component in SignIn.jsx, SignUp.jsx(the location after button)
```javascript
  ...
  import OAuth from '../components/OAuth';
    ...
    </Button>
    <OAuth />
    </form>
    ...
```
- create OAuth.js in component folder
```javascript
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button type="button" color="gray" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
```
- At server, make route in auth.route.js
```javascript
import { google } from '../controllers/auth.controller.js';
...
router.post('/google', google);
```
- make controller in auth.controller.js
```javascript
export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expire: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          expire: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
```
- add profilePicture model in user.model.js  
```javascript
  profilePicture: {
    type: String,
    default: 'http://??',
  },
```
<hr/>

34. update header component with user data
- modify Header.jsx  
```javascript
  import { useSelector } from 'react-redux';  
  ...
  export default function Header() {  
    ...
    const { currentUser } = useSelector((state) => state.user);
    return (
      ...
      {currentUser ? (
        <Dropdown arrowIcon={false} inline
          label={<Avatar  img={currentUser.profilePicture} rounded />}>
          <DropdownHeader>
            <span>@{currentUser.username}</span>
            <span>{currentUser.email}</span>
          </DropdownHeader>
          <Link to="/dashboard?tab=profile">
            <DropdownItem>Profile</DropdownItem>
          </Link>
          <DropdownDivider />
          <Link to="/sign-in">
            <DropdownItem>Sign Out</DropdownItem>
          </Link>
        </Dropdown>
      ) : (
        <Link to="/sign-in">
          <Button>
            Sign In
          </Button>
        </Link>
      )}
    )
```
<hr/>

35. complete dark mode functionality(client B)
- create theme folder at redux folder, and create themeSlice.js  
```javascript
  import { createSlice } from '@reduxjs/toolkit';
  const initialState = {
    theme: 'light',};
  export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      toggleTheme: (state) => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';},
    },
  });
  export const { toggleTheme } = themeSlice.actions;
  export default themeSlice.reducer;
```
- modify store.js  
```javascript
  import themeReducer from './theme/themeSlice';
  ...
  const rootReducer = combineReducers({ user: userReducer, theme: themeReducer });

```
- create ThemeProvider.jsx for chaging all children in components folder  
```javascript
  import { useSelector } from 'react-redux';
  export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);
    return (
      <div className={theme}>
        <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">
          {children}
        </div>
      </div>
    );
  }
```
- modify main.jsx for applying ThemeProvider  
```javascript
  ...
  import ThemeProvider from './components/ThemeProvider.jsx';
  ...
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </PersistGate>
```
- modify Header.jsx  
```javascript
  import { FaMoon, FaSun } from 'react-icons/fa';
  import { useSelector, useDispatch } from 'react-redux';
  import { toggleTheme } from '../redux/theme/themeSlice';
  ...
  export default function Header() {
    ...
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    ...
      <Button
      className="w-14 h-11 hidden sm:inline"
      color="gray"
      pill
      onClick={() => dispatch(toggleTheme())}
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </Button>
    ...
  }
```
- if not toggle light and dark mode, add nect code to index.css
```css
  @variant dark (&:where(.dark, .dark *));
  @layer base {
    body {@apply transition-colors duration-300;}
  } 
```
<hr/>

36. make dashboard private(only show when signed in)  
- create PrivateRoute.jsx in components folder(client) 
```javascript
  import { useSelector } from 'react-redux';  
  import { Outlet, Navigate } from 'react-router-dom';  
  export default function PrivateRoute() {  
    const { currentUser } = useSelector((state) => state.user);  
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;}  
```
- modify App.jsx()  
```javascript
  ...  
  import PrivateRoute from './components/PrivateRoute';
  export default function App() {  
    return (  
      ...  
     <Route element={<PrivateRoute />}>  
        <Route path="/profile" element={<Profile />} />  
      </Route>  
```  
<hr/>



### (37)  update user profile at server(C)  
- enable parsing cookie in index.js  
  > ...  
  > `import cookieParser from 'cookie-parser';`  
  > ...  
  > `app.use(cookieParser());`  
- check if authenticated or not(create middleware verifyUser.js in utils folder)  
  > `import { errorHandler } from './error.js';`  
  > `import jwt from 'jsonwebtoken';`  
  > `export const verifyToken = (req, res, next) => {`  
  > `const token = req.cookies.access_token;`  
  > `if (!token) return next(errorHandler(401, 'Unauthenticated!'));`  
  > `jwt.verify(token, process.env.JWT_SECRET, (err, user) => {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`if (err) return next(errorHandler(403, 'Token is not valid!'));`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`req.user = user;`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`next();`
  > `}); };`
- create verified user update router in user.route.js  
  > `import { updateUser } from '../controllers/user.controller.js';`  
  > `import { verifyToken } from '../utils/verifyUser.js';`  
  > ...  
  > `router.post('/update/:id', verifyToken, updateUser);`  
- update user DB in user.controller.js  
  > `import bcryptjs from 'bcryptjs';`  
  > `import User from '../models/user.model.js';`  
  > `import { errorHandler } from '../utils/error.js';`  
  > `export const updateUser = async (req, res, next) => {`  
  > `if (req.user.id !== req.params.id) {`  
  > &nbsp;&nbsp;`return next(errorHandler(401, 'You can update only your account!'));}`  
  > `try {`  
  > &nbsp;&nbsp;`if (req.body.password) {`  
  > &nbsp;&nbsp;`req.body.password = bcryptjs.hashSync(req.body.password, 10);}`  
  > `const updatedUser = await User.findByIdAndUpdate(`  
  > &nbsp;&nbsp;`req.params.id,`  
  > &nbsp;&nbsp;`{`  
  > &nbsp;&nbsp;`$set: {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`username: req.body.username,`  
  >&nbsp;&nbsp;&nbsp;&nbsp; `email: req.body.email,`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`password: req.body.password, },},`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`{ new: true },);`  
  > `const { password, ...rest } = updatedUser._doc;`  
  > `res.status(200).json(rest);`  
  > `} catch (error) {next(error);}`  
  > `};`  
- using insomnia, test update user
  > POST : localhost:3000/api/users/update/user_id

### (38)  update user profile at client(B)  
- create update user reducer in userSlice.js  
  > `export const userSlice = createSlice({`  
  > ...  
  > `reducers: {`  
  > ...  
  > `updateUserStart: (state) => {`  
  > &nbsp;&nbsp;`state.loading = true;},`  
  > `updateUserSuccess: (state, action) => {`  
  > &nbsp;&nbsp;`state.currentUser = action.payload;`  
  > &nbsp;&nbsp;`state.loading = false;`  
  > &nbsp;&nbsp;`state.error = null;},`  
  > `updateUserFailure: (state, action) => {`  
  > &nbsp;&nbsp;`state.error = action.payload;`  
  > &nbsp;&nbsp;`state.loading = false;},`  
  > ...  
- add change, submit handler in profile.jsx  
  > ...  
  > `import {updateUserStart, updateUserSuccess, updateUserFailure,} from '../redux/user/userSlice';`  
  > `import { useDispatch } from 'react-redux';`  
  > ...  
  > `export default function Profile() {`  
  > `const { currentUser, loading, error } = useSelector((state) => state.user);`  
  > `const dispatch = useDispatch();`  
  > `const [formData, setFormData] = useState({});`  
  > `const [updateSuccess, setUpdateSuccess] = useState(false);`  
  > `const handleChange = (e) => {`  
  > &nbsp;&nbsp;`setFormData({ ...formData, [e.target.id]: e.target.value });};`  
  > `const handleSubmit = async (e) => {`  
  > &nbsp;&nbsp;`e.preventDefault();`  
  > &nbsp;&nbsp;`try {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`dispatch(updateUserStart());`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`const res = await fetch('/api/users/update/${currentUser._id}', {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`method: 'POST', headers: {'Content-Type': 'application/json',},`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`body: JSON.stringify(formData),});`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`const data = await res.json();`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`if (data.success === false) {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`dispatch(updateUserFailure(data.message));`  
  > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`return;}`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`dispatch(updateUserSuccess(data));`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`setUpdateSuccess(true);`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`setFormData({});`  
  > &nbsp;&nbsp;`} catch (error) {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`dispatch(updateUserFailure(error.message));}`  
  > `};`  
  > `return (`  
    &nbsp;&nbsp;`<div>`  
    &nbsp;&nbsp;`<form onSubmit={handleSubmit}>`  
  > &nbsp;&nbsp;...  
  > &nbsp;&nbsp;`<input`  
    &nbsp;&nbsp;&nbsp;&nbsp;`type="text"`  
    &nbsp;&nbsp;&nbsp;&nbsp;`id="username"`  
    &nbsp;&nbsp;&nbsp;&nbsp;`placeholder="Username"`  
    &nbsp;&nbsp;&nbsp;&nbsp;`defaultValue={currentUser.username}`  
    &nbsp;&nbsp;&nbsp;&nbsp;`onChange={handleChange}/>`  
  >&nbsp;&nbsp;...  
  > &nbsp;&nbsp;`<button`  
    &nbsp;&nbsp;&nbsp;&nbsp;`disabled={loading}`  
  >  &nbsp;&nbsp;&nbsp;&nbsp;...  
  > &nbsp;&nbsp;&nbsp;&nbsp;`{loading ? 'Loading' : 'User update'}`  
  > &nbsp;&nbsp;`</button>`  
  > &nbsp;&nbsp;`</form>`  
  > &nbsp;&nbsp;...  
- using insomnia, change and update profile, check Mongo DB
<hr/>

### (39)  delete user profile at server(C)  
- create delete router in user.route.js  
  > `import {deleteUser} from '../controllers/user.controller.js';`  
  > ...  
  > `router.delete('/delete/:id', verifyToken, deleteUser);`  
- delete user DB in user.controller.js  
  > ...  
  > `export const deleteUser = async (req, res, next) => {`  
  > `if (req.user.id !== req.params.id) {`  
  > &nbsp;&nbsp;`return next(errorHandler(401, 'You can delete only your account!')); }`  
  > `try {`  
  > &nbsp;&nbsp;`await User.findByIdAndDelete(req.params.id);`  
  > &nbsp;&nbsp;`res.clearCookie('access_token');`  
  > &nbsp;&nbsp;`res.status(200).json({ message: 'User deleted successfully!' });`  
  > `} catch (error) {`  
  > `next(error); } };`  

### (40)  delete user profile at client(B)  
- create delete user reducer in userSlice.js  
  > ...  
  > `export const userSlice = createSlice({`  
  > `name: 'user', initialState,`  
  > `reducers: {`  
  > ...  
  > `deleteUserStart: (state) => {`  
  > &nbsp;&nbsp;`state.loading = true;},`  
  > `deleteUserSuccess: (state) => {`  
  > &nbsp;&nbsp;`state.currentUser = null;`  
  > &nbsp;&nbsp;`state.loading = false;`  
  > &nbsp;&nbsp;`state.error = null;},`  
  > `deleteUserFailure: (state, action) => {`  
  > &nbsp;&nbsp;`state.error = action.payload;`  
  > &nbsp;&nbsp;`state.loading = false;},`  
  > ...
- add delete handler in profile.jsx  
  > ...  
  > `import {deleteUserStart, deleteUserSuccess, deleteUserFailure,} from '../redux/user/userSlice';`  
  > `export default function Profile() {`  
  > ...
  > `const handleDelete = async () => {`  
  > &nbsp;&nbsp;`try {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`dispatch(deleteUserStart());`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`const res = await fetch('/api/users/delete/${currentUser._id}', {method: 'DELETE',});`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`const data = await res.json();`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`if (data.success === false) {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`dispatch(deleteUserFailure(data.message));`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`return;}`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`dispatch(deleteUserSuccess(data));`  
  > &nbsp;&nbsp;`} catch (error) {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`dispatch(deleteUserFailure(error.message));}`  
  > &nbsp;&nbsp;`};`  
  > ...
<hr/>

### (41) signout at server(C)  
- add signout router in auth.route.js  
  > `import { signup, signin, signout } from '../controllers/auth.controller.js';`  
  > ...  
  > `router.get('/signout', signout);`    
  > ...  
- add signout function in auth.controller.js  
  > ...  
  > `export const signout = async (req, res, next) => {`  
  > `try {`  
  > &nbsp;&nbsp;`res.clearCookie('access_token');`  
  > &nbsp;&nbsp;`res.status(200).json({ message: 'User logged out successfully!' });`  
  > `} catch (error) {`  
  > &nbsp;&nbsp;`next(error);}`  
  > `};`  

### (42) signout at client(B)  
- create signout reducer in userSlice.js  
  > ...  
  > `signoutStart: (state) => {`  
  > &nbsp;&nbsp;`state.loading = true;},`  
  > `signoutSuccess: (state) => {`  
  > &nbsp;&nbsp;`state.currentUser = null;`  
  > &nbsp;&nbsp;`state.loading = false;`  
  > &nbsp;&nbsp;`state.error = null;},`  
  > `signoutFailure: (state, action) => {`  
  > &nbsp;&nbsp;`state.error = action.payload;`  
  > &nbsp;&nbsp;`state.loading = false;},`  
  > ...
- add signout handler in profile.jsx  
  > ...  
  > `import {signoutStart, signoutSuccess, signoutFailure,} from '../redux/user/userSlice';`  
  > `export default function Profile() {`  
  > ...  
  > `const handleSignout = async () => {`  
  > `try {`  
  > &nbsp;&nbsp;`dispatch(signoutStart());`  
  > &nbsp;&nbsp;`const res = await fetch('/api/auth/signout', {method: 'GET',});`  
  > &nbsp;&nbsp;`const data = await res.json();`  
  > &nbsp;&nbsp;`if (data.success === false) {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`dispatch(signoutFailure(data.message));`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`return;}`  
  > &nbsp;&nbsp;`dispatch(signoutSuccess(data));`  
  > `} catch (error) {`  
  > &nbsp;&nbsp;`dispatch(signoutFailure(error.message));`  
  > `}`  
  > ...  
<hr/>
the end of signup, login, logout 
<hr/>   

### (43) Add listing api route at server(C) and MongoDB  
- create listing route, listing.route.js in routes folder   
  >`import express from 'express';`  
  >`import { createListing } from '../controllers/listing.controller.js';`  
  >`import { verifyToken } from '../utils/verifyUser.js';`  
  >`const router = express.Router();`  
  >`router.post('/create', verifyToken, createListing);`  
  >`export default router;`  
- add router in index.js  
  > ...  
  > `import listingRouter from './routes/listing.route.js';`  
  > ...  
  > `app.use('/api/listing', listingRouter);`  
- create listing controller in listing.controller.js(controllers folder)  
  > `import Listing from '../models/listing.model.js';`  
  > `export const createListing = async (req, res, next) => {`  
  > `try {`  
  > &nbsp;&nbsp;`const listing = await Listing.create(req.body);`  
  > &nbsp;&nbsp;`res.status(201).json(listing);`  
  > `} catch (error) {`         
  > &nbsp;&nbsp;`next(error);`  
  > `}};`   
- create listing model in listing.model.js(models folder)  
  > `import mongoose from 'mongoose';`  
  > `const listingSchema = new mongoose.Schema(`  
  > `{`  
  > `name: {`  
  > `type: String,`  
  > `required: true,`  
  > `},`  
  > `...}`  
  > `{ timestamps: true } );`  
  > `const Listing = mongoose.model('Listing', listingSchema);`  
  > `export default Listing;`  
- using insomnia, create new listing
  > POST : localhost:3000/api/listing/create (logged in first)
- check MongoDB if the listing is created
<hr/>

### (44) add listing page at client(B)  
- add link button in profile.jsx  
  > `import { Link } from 'react-router-dom';`  
  > ...  
  > `<form>`  
  > ...
  > `<Link to="/create-listing">`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`Create Listing`  
  > `</Link>`  
  > `</form>`  
  > ...
- add route in app.jsx as a member of ProviteRoute  
  > ...  
  > `import CreateListing from './pages/CreateListing';`  
  > ...
  > `<Route element={<PrivateRoute />}>`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`<Route path="/create-listing" element={<CreateListing />} />`  
  > `</Route>`    
  > ...
- create CreateListing.jsx  
  - make UI for needed data
  - make functionality
  - when succeded, navigate to list page

### (45) get a certain user's listings at server(C)  
- modify user.route.js  
  > ...   
  > `import {getUserListings} from '../controllers/user.controller.js';`  
  > ...  
  > `router.get('/listings/:id', verifyToken, getUserListings);`  
  > ...  
- modify user.controller.js  
  > ...  
  > `import Listing from '../models/listing.model.js';`   
  > ...  
  > `export const getUserListings = async (req, res, next) => {`  
  > `if (req.user.id !== req.params.id) {`  
  > `return next(errorHandler(401, 'You can get only your listings!'));}`  
  > `try {`  
  > `const listings = await Listing.find({ userRef: req.params.id });`  
  > `res.status(200).json(listings);`  
  > `} catch (error) {next(error);}`  
  > `};`  
<hr/>

### (46) delete user listing at server(C) and client(B)  
- modify listing.route.js(at server)  
  > ...  
  > `import {deleteListing} from '../controllers/listing.controller.js';`  
  > ...  
  > `router.delete('/delete/:id', verifyToken, deleteListing);`  
  > ...  
- modify listing.controller.js(at server)  
  > ...  
  > `export const deleteListing = async (req, res, next) => {`  
  > `try {`  
  > &nbsp;&nbsp;`const listing = await Listing.findById(req.params.id);`  
  > &nbsp;&nbsp;`if (!listing) {return next(errorHandler(404, 'Listing not found!'));}`  
  > &nbsp;&nbsp;`if (listing.userRef.toString() !== req.user.id) {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`return next(errorHandler(401, 'You can delete only your listings!'));}`  
  > &nbsp;&nbsp;`await Listing.findByIdAndDelete(req.params.id);`  
  > &nbsp;&nbsp;`res.status(200).json({ message: 'Listing deleted successfully!' });`  
  > `} catch (error) {next(error);}`  
  > `};`  
- modify profile.jsx (at client)  
  > ...   
  > `const handleListingDelete = async (listingId) => {`  
  > `try {`  
  > &nbsp;&nbsp;`const res = await fetch('/api/listing/delete/${listingId}',`   
  > &nbsp;&nbsp;&nbsp;&nbsp;`{method: 'DELETE',});`  
  > &nbsp;&nbsp;`const data = await res.json();`  
  > &nbsp;&nbsp;`if (data.success === false) {console.log(data.message);`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`return;}`  
  > &nbsp;&nbsp;`setUserListings((prev) =>`  
  > &nbsp;&nbsp;`prev.filter((listing) => listing._id !== listingId),);`  
  > &nbsp;&nbsp;`handleShowListings();`  
  > `} catch (error) {console.log(error);}`  
  > `};`  
  > ... 
  > `<button`  
  > &nbsp;&nbsp;`onClick={() => handleListingDelete(listing._id)}>`  
  > &nbsp;&nbsp;`Delete`  
  > `</button>`  
  > ...  
<hr/>

### (47) update user listing at server(C) and client(B)  
- modify listing.route.js(at server)  
  > ...  
  > `import { updateListing, getListing} from '../controllers/listing.controller.js';`  
  > ...  
  > `router.post('/update/:id', verifyToken, updateListing);`  
  > `router.get('/get/:id', getListing);`  
  > ...  
- modify listing.controller.js(at server)  
  > ...  
  > `export const updateListing = async (req, res, next) => {`  
  > `try {`  
  > &nbsp;&nbsp;`const listing = await Listing.findById(req.params.id);`  
  > &nbsp;&nbsp;`if (!listing) {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`return next(errorHandler(404, 'Listing not found!')); }`  
  > &nbsp;&nbsp;`if (listing.userRef.toString() !== req.user.id) {`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`return next(errorHandler(401, 'You can delete only your listings!')); }`  
  > &nbsp;&nbsp;`const updatedListing = await Listing.findByIdAndUpdate(`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`req.params.id,`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`req.body,`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`{ new: true }, );`  
  > &nbsp;&nbsp;`res.status(200).json(updatedListing);`  
  > `} catch (error) {`  
  > `next(error);`  
  > `} };`  
  > ... 
  > ...   
  > `export const getListing = async (req, res, next) => {`  
  > `try {`  
  > `const listing = await Listing.findById(req.params.id);` 
  > `if (!listing) {`  
  > `return next(errorHandler(404, 'Listing not found!'));}`  
  > `res.status(200).json(listing);`  
  > `} catch (error) {`  
  > `next(error);`  
  > `} };`  
- modify profile.jsx (at client)  
  > ...  
  > `<button`  
  > `onClick={() => navigate(`/edit-listing/${listing._id}`)>`  
  > `Edit`  
  > `</button>`  
  > ...  
- add route in app.jsx as a member of PrivateRoute  
  > ...  
  > `import EditListing from './pages/EditListing';`  
  > ...  
  > `<Route element={<PrivateRoute />}>`  
  > &nbsp;&nbsp;&nbsp;&nbsp;`<Route path="/edit-listing/:id" element={<EditListing />} />`  
  > `</Route>`  
  > ...   
- create EditListing.jsx just like CreateListing.jsx but some differences 
  > ...  
  > `import {useParams } from 'react-router-dom';`  
  > `export default function EditListing() {`  
  > ...
  > `const params = useParams();`  
  > ...  
  > `useEffect(() => {`  
  > `const fetchListing = async () => {`  
  > `const listingId = params.id;`  
  > `const res = await fetch(`/api/listing/get/${listingId}`);`  
  > `const data = await res.json();`  
  > `if (data.success === false) {console.log(data.message);`  
  > `return; }`  
  > `setFormData(data);`  
  > `};`  
  > `fetchListing();},`  
  > `[params.id]);`    
  > ...  
  > ...  
  > `const handleSubmit = async (e) => {`  
  > ...  
  > `const res = await fetch(`/api/listing/update/${params.id}`, {`  
  > `method: 'POST',`  
  > `headers: {'Content-Type': 'application/json',},`  
  > `body: JSON.stringify({ ...formData, userRef: currentUser._id }),});`  
  > `const data = await res.json();`  
  > ...  
  > `navigate(`/listing/${data._id}`);`  
  > ... 
<hr/>

### (48) detail listing page at client(B)  
- create route in app.jsx  
  > ...  
  > `import Listing from './pages/Listing';`  
  > ...  
  > `<Route path="/listing/:listingId" element={<Listing />} />`  
  > ...   
- create Listing.jsx, importing useEffect, useState, useParams  

### (49) add contact message at server(C) and client(B)  
- add route for getting one user infomation in user.route.js 
  > ...  
  > `import {getUser} from '../controllers/user.controller.js';`
  > ...  
  > `router.get('/get/:id', verifyToken, getUser);`  
  > ...  
- add getUser function in user.controller.js  
  > ...  
  > `export const getUser = async (req, res, next) => {`  
  > `try {`  
  > &nbsp;&nbsp;`const user = await User.findById(req.params.id);`  
  > &nbsp;&nbsp;`if (!user) {`  
  > &nbsp;&nbsp;`return next(errorHandler(404, 'User not found!'));}`  
  > &nbsp;&nbsp;`const { password, ...rest } = user._doc;`  
  > &nbsp;&nbsp;`res.status(200).json(rest);`  
  > `} catch (error) {`  
  > &nbsp;&nbsp;`next(error);}`  
  > `};`    
- add contact message to listing.jsx  
  > ...
  > `import { useSelector } from 'react-redux';`  
  > `import Contact from '../components/Contact';`  
  > ...  
  > `const Listing = () => {`  
  > ...  
  > `const { currentUser } = useSelector((state) => state.user);`  
  > `const [contact, setContact] = useState(false);`  
  > ...  
  > `{currentUser && currentUser._id !== listing.userRef && !contact && (`  
  > `<button onClick={() => setContact(true)} Contact Landlord</button>)}`  
  > `{contact && <Contact listing={listing} />}`  
  > ...  
  > `}`  
<hr/>

### (50) add search api at server(C)  
- add search router in listing.route.js  
  ```javascript
   ...  
   import {getListings} from '../controllers/listing.controller.js'; 
   ...  
   router.get('/get', getListings);
- add search function in listing.controller.js  
  ```javascript
  ...  
  export const getListings = async (req, res, next) => {  
    try {  
      const limit = parseInt(req.query.limit) || 9;  
      const startIndex = parseInt(req.query.startIndex) || 0;  
      let offer = req.query.offer;  
      if (offer === undefined || offer === 'false') {  
        offer = { $in: [false, true] };}
      let furnished = req.query.furnished;
      if (furnished === undefined || furnished === 'false') {  
        furnished = { $in: [false, true] };}  
      let parking = req.query.parking; 
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };} 
      let type = req.query.type; 
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };} 
      const searchTerm = req.query.searchTerm || '';  
      const sort = req.query.sort || 'createdAt';  
      const order = req.query.order || 'desc';  
      const listings = await Listing.find({  
        name: { $regex: searchTerm, $options: 'i' },  
        offer,  
        furnished,  
        parking,  
        type,})  
      .sort({ [sort]: order })  
      .limit(limit)  
      .skip(startIndex);  
      return res.status(200).json(listings);  
    } catch (error) {  
      next(error);}};
- test using insomnia
<hr/>

### (51) header search form at client(B)  
- add function in Header.jsx  
  ```javascript
  ...  
  import { Link, useNavigate } from 'react-router-dom';  
  import { useEffect, useState } from 'react';  
  ...  
  export default function Header() {  
  ...  
  const [searchTerm, setSearchTerm] = useState('');  
  const navigate = useNavigate();  
  const handleSubmit = (e) => {  
    e.preventDefault();  
    const urlParams = new URLSearchParams(window.location.search);  
    urlParams.set('searchTerm', searchTerm);  
    const urlQuery = urlParams.toString();  
    navigate('/search?${urlQuery}');};  
    useEffect(() => {  
      const urlParams = new URLSearchParams(location.search);  
      const searchTermFromUrl = urlParams.get('searchTerm');  
      if (searchTermFromUrl) {  
      setSearchTerm(searchTermFromUrl);} }, []);  
  return (  
    ...  
    <form onSubmit={handleSubmit}>  
    ...  
    <input  
      type="text"  
      placeholder="Search"  
      value={searchTerm}  
      onChange={(e) => setSearchTerm(e.target.value)}  
    ...  
  ) }
<hr /> 

### (52) add search page at client(B)  
- add route in app.jsx
  ```javascript
  ...  
  import Search from './pages/Search';  
  ...  
  <Route path="/search" element={<Search />} />  
  ...
- create Search.jsx  

### (53) add more page view at client(B)  










# 【ETC】   
### ✓ work at various PCs(A → A and B)   
- B> git clone "github_address" (Just once at first)  
  - project_dir> npm install(each package.json)  
  - project_dir> make and code .env  
  - coding  
  - git add, commit, and push  
- afterwards both A and B do the next process  
  - git pull origin main  
  - git add .  
  - git commit -m "work of A(or B)"  
  - git push origin main  
- always "git push" when get off work, always "git pull" when start work  
<hr />

### ✓Change git folder (B → A)  
- B(client)> `mv .git ../`  
- move ".gitignore" in B to A     
  - check & add "node_modules", ".env" to ".gitignore"  
- move "README md file" in B to A(if exists)  
- git commit & push(at A folder)  
  > `git add .`   
  > `git commit -m "~~~"`   
  > `git push`  
<hr />

### ✓ mrkdown syntax  
- can use HTML, but why?  
  <h3 style="color:red">hello</h3>
- To create new line, end a line with two or more spaces, and then type return. <br/> or use br tag instead  
- bold : **hello**  
- italic : _hello_  
- bold and italic : **_hello_**  
- blockquotes  
  > Hello  
  > World  
- nestedquotes  
  > Hello  
  > > World  
- To add another element in a list while preserving the continuity of the list, indent the element four spaces or one tab.  
  > hello  
- using '\&nbsp;' for indenting or spacing   
   h&nbsp;&nbsp;e&nbsp;&nbsp;l&nbsp;&nbsp;l&nbsp;&nbsp;o  
- Code blocks are normally indented four spaces or one tab. When they’re in a list, indent them eight spaces or two tab  
- images:  
![image1](client/public/byh.jpg)  
![Image2](https://github.com/user-attachments/assets/af165e4b-b509-4425-a77e-1521621eea5f)  
- code : `print("hello")`  
- link : [google](https://google.com)  
- url and e-mail : <https://www.google.com>
  <aaa@gmail.com>  