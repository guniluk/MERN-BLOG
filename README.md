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

37. complete sidebar of dashboard at client(B)
- modify Dashboard.jsx  
```javascript
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === 'profile' && <DashProfile />}
    </div>
  );
}
```
- make DashSidebar.jsx in components folder  
```javascript
import {Sidebar,SidebarItem,SidebarItemGroup,SidebarItems,} from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {setTab(tabFromUrl);}
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            as={Link}
            to="/dashboard?tab=profile"
            active={tab === 'profile'}
            icon={HiUser}
            label="user"
            labelColor="dark"
          >
            Profile
          </SidebarItem>
          <SidebarItem icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
```
<hr/>

38. complete DashProfile.jsx at client(B)  
```javascript
  import { useSelector } from 'react-redux';
  import { Button, TextInput } from 'flowbite-react';
  export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    return (
      <div className="max-w-lg mx-auto p-5 w-full">
        <h1 className="text-slate-400 text-xl font-bold mb-7 my-7 text-center">
          Profile
        </h1>
        <form className="flex flex-col gap-7">
          <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img
              src={currentUser.profilePicture}
              alt="user"
              className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
            />
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder="username"
            defaultValue={currentUser.username}
          />
          <TextInput
            id="email"
            type="email"
            placeholder="e-mail"
            defaultValue={currentUser.email}
          />
          <TextInput id="password" type="password" placeholder="password" />
          <Button type="submit" color="green" outline>
            Update
          </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </div>
    );
  }
```
<hr/>

39. image upload in DashProfile.jsx at client(B)  
- modify DashProfile.jsx  
```javascript
  ...
  import { useState, useRef, useEffect } from 'react';
  ...
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImageFileUrl(null);
    }
  };
  const uploadImage = async () => {
    // on firebase, Spark plan cannot make file storage
    // so, image cannot be stored in cloud
  };
  useEffect(() => {
    if (imageFile) {uploadImage();}}, [imageFile]);
  return (
    ...
    <form className="flex flex-col gap-7">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      ref={filePickerRef}
      hidden/>
    <div
      className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
      onClick={() => {
        filePickerRef.current.click();
      }}
    >
      <img
        src={imageFileUrl || currentUser.profilePicture}
        alt="user"
        className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
      />
    </div>
    ...
    </form>
    ...
  )
```
<hr/>

40.  update user profile API at server(C)  
- check if authenticated or not(create middleware verifyUser.js in utils folder)  
```javascript
  import { errorHandler } from './error.js';  
  import jwt from 'jsonwebtoken';  
  export const verifyToken = (req, res, next) => {  
    const token = req.cookies.access_token;  
    if (!token) return next(errorHandler(401, 'Unauthenticated!'));  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  
      if (err) return next(errorHandler(403, 'Token is not valid!'));  
      req.user = user;  //{ id: validUser._id } from auth.controller.js
      next();
    }); };
```
- enable parsing cookie in index.js  
  - install cookie-parser at A folder
    A> `npm i cookie-parser`  
  -  initialize cookie-parser in index.js  
  ```javascript
    ...  
    import cookieParser from 'cookie-parser';  
    ...  
    app.use(cookieParser()); 
  ``` 
- create verified user update router in user.route.js  
```javascript
  import { updateUser } from '../controllers/user.controller.js';  
  import { verifyToken } from '../utils/verifyUser.js';  
  ...  
  router.post('/update/:userId', verifyToken, updateUser);  
```
- update user DB in user.controller.js  
```javascript
  import bcryptjs from 'bcryptjs';  
  import User from '../models/user.model.js';  
  import { errorHandler } from '../utils/error.js';  
  export const updateUser = async (req, res, next) => {  
    if (req.user.id !== req.params.userId) {  
    return next(errorHandler(401, 'You can update only your account!'));}  
    try {  
      if (req.body.password) {  
        req.body.password = bcryptjs.hashSync(req.body.password, 10);}  
        const updatedUser = await User.findByIdAndUpdate(  
          req.params.id,  
          {  
            $set: {  
              username: req.body.username,  
              email: req.body.email, 
              password: req.body.password, },},  
          { new: true },);  
        const { password, ...rest } = updatedUser._doc;  
        res.status(200).json(rest);  
   } catch (error) {next(error);}  
};
```  
- using insomnia, test update user
  > POST : localhost:3000/api/users/update/user_id
<hr/>

41. complete update user profile page at client(B)  
- create update user reducer in userSlice.js  
```javascript
export const userSlice = createSlice({  
  ...  
  reducers: {  
    ...  
    updateUserStart: (state) => {  
      state.loading = true;},  
    updateUserSuccess: (state, action) => {  
      state.currentUser = action.payload;  
      state.loading = false;  
      state.error = null;},  
    updateUserFailure: (state, action) => {  
      state.error = action.payload;  
      state.loading = false;},  
  }
} 
``` 
- add change, submit handler in DashProfile.jsx  
```javascript
  ...  
  import {updateUserStart, updateUserSuccess, updateUserFailure,} from '../redux/user/userSlice';  
  import { useDispatch } from 'react-redux';  
  ...  
  export default function DashProfile() {  
    const { currentUser, loading, error } = useSelector((state) => state.user);  
    const dispatch = useDispatch();  
    const [formData, setFormData] = useState({});  
    const [updateSuccess, setUpdateSuccess] = useState(false);  
    const [updateError, setUpdateError] = useState(null);
    ...
    const handleChange = (e) => {
      setFormData((prev) => ({...prev,[e.target.id]: e.target.value,}));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUpdateError(null);
      setUpdateSuccess(null);
      if (Object.keys(formData).length === 0) {
        setUpdateError('No change detected!');
        return;}
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',},
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateUserFailure(data.message));
          setUpdateError(data.message);
        } else {
          dispatch(updateUserSuccess(data));
          setUpdateSuccess('User profile updated successfully!');
        }
      } catch (error) {
        dispatch(updateUserFailure(error.message));
        setUpdateError(error.message);
      }
    };
    return (  
      <div>  
        <form onSubmit={handleSubmit}>  
          ...  
          <input  
          type="text"  
          id="username"  
          placeholder="Username"  
          defaultValue={currentUser.username}  
          onChange={handleChange}/>  
          ...  
          <button  
            disabled={loading}  
            ...>  
            {loading ? 'Loading' : 'User update'} 
          </button>  
        </form>  
        {updateSuccess && (<Alert color="green" className="mt-5">{updateSuccess}</Alert>)}
        {updateError && (<Alert color="red" className="mt-5">{updateError}</Alert>)}
      </div>  
    );  
  }  
```
- change and update profile, check Mongo DB
<hr/>

42. add delete user profile at server(C)  
- create delete router in user.route.js 
```javascript 
  import {deleteUser} from '../controllers/user.controller.js';  
  ...  
  router.delete('/delete/:id', verifyToken, deleteUser);
```  
- delete user DB in user.controller.js  
```javascript
  ...  
  export const deleteUser = async (req, res, next) => {  
    if (req.user.id !== req.params.userId) {  
      return next(errorHandler(401, 'You can delete only your account!')); }  
    try {  
      await User.findByIdAndDelete(req.params.userId);  
      res.clearCookie('access_token');  
      res.status(200).json({ message: 'User deleted successfully!' });  
  } catch (error) {  
    next(error); } };
```  
<hr/>

43. complete delete user profile at client(B)  
- create delete user reducer in userSlice.js  
```javascript
  ...  
  export const userSlice = createSlice({  
    name: 'user', initialState,  
    reducers: {  
      ...  
      deleteUserStart: (state) => { state.loading = true;},  
      deleteUserSuccess: (state) => {  
        state.currentUser = null;  
        state.loading = false;  
        state.error = null;}, 
      deleteUserFailure: (state, action) => {  
        state.error = action.payload;  
       state.loading = false;}
    }
  })  
```
- add delete handler in DashProfile.jsx  
```javascript
  ...  
  import {deleteUserStart, deleteUserSuccess, deleteUserFailure,} from '../redux/user/userSlice';  
  export default function DashProfile() {  
    ...
    const { currentUser, error } = useSelector((state) => state.user);
    const [showModal, setShowModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    ...
    const handleDelete = async () => {
      setShowModal(false);
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',});
        const data = await res.json();
        if (!res.ok) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };
    return (
    <div>
      ...
      <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
      </span>
      ...
      {error && (<Alert color="red" className="mt-5">{error}</Alert>)}
      ...
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <ModalHeader>Delete Account</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-17 h-17 text-gray-400 dark:text-gray-200 mb-5 mx-auto" />
            <h3 className="mb-5 text-gray-500 dark:text-gray-200 text-lg">
              Are you sure you want to delete your account? This action cannotbe undone^^
            </h3>
          </div>
        </ModalBody>
        <ModalFooter className="mx-auto">
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button color="red" onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
    );}
  }
```
<hr/>

44. signout at server(C)  
- add signout router in auth.route.js 
```javascript 
  import { signup, signin, signout } from '../controllers/auth.controller.js';  
  ...  
  router.get('/signout', signout);    
  ...  
```
- add signout function in auth.controller.js  
```javascript
  ..  
  export const signout = async (req, res, next) => {  
    try {  
      res.clearCookie('access_token');  
      res.status(200).json({ message: 'User logged out successfully!' });  
    } catch (error) {  
      next(error);}  
  };  
```
<hr/>

45. signout at client(B)  
- create signout reducer in userSlice.js  
```javascript
  ...  
  signoutStart: (state) => {state.loading = true;},  
  signoutSuccess: (state) => {  
    state.currentUser = null;  
    state.loading = false; 
    state.error = null;},  
  signoutFailure: (state, action) => {  
    state.error = action.payload;  
    state.loading = false;},  
  ...
```
- add signout handler in DashProfile.jsx  
```javascript
...  
import {signoutStart, signoutSuccess, signoutFailure,} from '../redux/user/userSlice';  
export default function Profile() {  
...  
const handleSignout = async () => {  
  try {  
    dispatch(signoutStart());  
    const res = await fetch('/api/auth/signout', {method: 'GET',});  
    const data = await res.json();  
    if (data.success === false) {  
      dispatch(signoutFailure(data.message));  
      return;}  
    dispatch(signoutSuccess(data));  
  } catch (error) {  
    dispatch(signoutFailure(error.message));  
  }  
}  
```
- modify header.jsx (add signout functionality)  
```javascript
  import {signoutStart, signoutSuccess,signoutFailure,} from '../redux/user/userSlice';
...
  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };
  ...
  <DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>
  ...
```
- modify DashSidebar.jsx(add signout functionality)  
```javascript
  ...
import {signoutStart,signoutSuccess,signoutFailure,} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
export default function DashSidebar() {
  ...
  const dispatch = useDispatch();
  ...
  const handleSignout = async () => {
  try {
    dispatch(signoutStart());
    const res = await fetch('/api/user/signout', { method: 'POST' });
    const data = await res.json();
    if (!res.ok) {
      dispatch(signoutFailure(data.message));
      return;
    }
    dispatch(signoutSuccess(data));
  } catch (error) {
    dispatch(signoutFailure(error.message));
  }
  };
  return (
    ...
    <SidebarItem icon={HiArrowSmRight} onClick={handleSignout}>
      Sign Out
    </SidebarItem>
    ...
  )
}
```
<hr/>

46. add admin functionality to the user at server(C)  
- modify user.model.js  
```javascript
  isAdmin: {
    type: Boolean,
    default: false,
  },
```
- modify auth.controller.js  
```javascript
  ...
  const token = jwt.sign(
    { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
  );
  ...
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
  );
  ...
  const token = jwt.sign(
    { id: newUser._id, isAdmin: newUser.isAdmin },
    process.env.JWT_SECRET,
  );
  ...
```
<hr/>

47. add admin functionality at client(B) and create a post page
- create PriveateRouter(OnlyAdminPrivateroute) in components folder
```javascript
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
```
- modify App.jsx
```javascript
...
import CreatePost from './pages/CreatePost.jsx';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx';
...
  <Route element={<OnlyAdminPrivateRoute />}>
    <Route path="/create-post" element={<CreatePost />} />
  </Route>
...
```
- modify DashProfile.jsx  
```javascript
  ...
  import { Link } from 'react-router-dom';
  ...
    {currentUser.isAdmin && (
    <Link to={'/create-post'}>
      <Button type="button" color="blue" outline className="w-full">
        Create Post
      </Button>
    </Link>
  )}

```
- create CreatePost.jsx  
  - install react-quill-new 
    > `npm i react-quill-new`  
  - create CreatePost.jsx  
```javascript
  import { Button, FileInput, Select, TextInput } from 'flowbite-react';
  import ReactQuill from 'react-quill-new';
  import 'react-quill-new/dist/quill.snow.css';
  export default function CreatePost() {
  return (
    <div className="max-w-6xl p-3 mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-gray-800 dark:text-white">
        Create Post
      </h1>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput id="title" type="text" placeholder="Title" required className="flex-1"/>
          <Select>
            <option value="uncatagorized">Select a Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.JS</option>
            <option value="nextjs">Next.JS</option>
            <option value="python">Python</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button type="button" color="green" size="sm" className="p-5" outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill theme="snow" placeholder="Write something..." className="h-72 mb-12" required/>
        <Button type="submit" color="green">Publish</Button>
      </form>
    </div>
  );
}
```
- modify index.css
```css
  body {
    height: 100vh;
  }
  .ql-editor {
    font-size: 1.1rem;
  }
```
<hr/>

48. create post api router at server(C)  
- create  post.route.js  in routes folder  
```javascript
  import express from 'express';
  import { verifyToken } from '../utils/verifyUser.js';
  import { create } from '../controllers/post.controller.js';
  const router = express.Router();
  router.post('/create', verifyToken, create);
  export default router;
```
- modify index.js(add post router)  
```javascript
  ...
  import postRoutes from './routes/post.router.js';
  ...
  app.use('/api/post', postRoutes);
  ...
```
- create post model in post.model.js  
```javascript
  import mongoose from 'mongoose';
  const postSchema = new mongoose.Schema(
    {
      userId: {type: String, required: true,},
      content: {type: String, required: true,},
      title: {type: String, required: true, unique: true,},
      image: { type: String, default:'https://~jpg',},
      category: {type: String,default: 'uncategorized',},
      slug: {type: String, required: true, unique: true,},},
    { timestamps: true },);
  const Post = mongoose.model('Post', postSchema);
  export default Post;
```
- create post controller post.controller.js in controllers folder  
```javascript
  import { errorHandler } from '../utils/error.js';
  import Post from '../models/post.model.js';
  export const create = async (req, res, next) => {
    if (!req.user.isAdmin) { //from verifyToken
      return next(errorHandler(403, 'You are not authorized!'));
    }
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, 'All fields are required!'));
    }
    const slug = req.body.title.toLowerCase().split(' ').join('-')
          .replace(/[^a-z0-9-]/g, '');
    const newPost = new Post({...req.body, slug, userId: req.user.id,});
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  };
```
- test to create post by using insomnia 
<hr/>

49. create post functionality at CreatePost.jsx in pages folder at client(B)  
```javascript
  ...
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const handleUploadImage = () => {console.log(file);};
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.title || !formData.content) {
        return alert('All fields are required');}
      try {
        const res = await fetch('/api/post/create', {
          method: 'POST', headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(formData),});
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;}
        alert('Post created successfully');
        setFormData({});
        setFile(null);
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      } catch (error) {
        setPublishError(error.message);}
    };

    return (
    ...
    <form onSubmit={handleSubmit}>
      ...
      <TextInput
        onChange={(e) =>
        setFormData({ ...formData, title: e.target.value })}/>
      <Select
        onChange={(e) =>
        setFormData({ ...formData, category: e.target.value })}>
      ...
      <FileInput
        onChange={(e) => setFile(e.target.files[0])}/>
      <Button onClick={handleUploadImage}>Upload Image</Button>
      <ReactQuill
        onChange={(value) => setFormData({ ...formData, content: value })}/>
        ...
      {publishError && (<Alert color="failure">{publishError}</Alert>)}
      </form>
  }
```
<hr/>

50. add posts section to the dashboard at client(B)
- add Posts tab at DashSidebar.jsx
```javascript
  ...
  import { useSelector } from 'react-redux';
  ...
  export default function DashSidebar() {
    const { currentUser } = useSelector((state) => state.user);
    ...
    return (
      <Sidebar className="w-full md:w-56">
        <SidebarItems>
          <SidebarItemGroup flex flex-col gap-5>
            ...
            {currentUser.isAdmin && (
              <SidebarItem
                as={Link}
                to="/dashboard?tab=posts"
                active={tab === 'posts'}
                icon={HiDocumentText}
              >
                Posts
              </SidebarItem>
            )}
        ...
    )
  }
```
- add posts at Dashboard.jsx
```javascript
  ...
  import DashPosts from '../components/DashPosts';
  ...
    </div>
      {/* right side */}
      {tab === 'profile' && <DashProfile />}
      {/* posts */}
      {tab === 'posts' && <DashPosts />}
    </div>
  ...
```
- just create DashPosts.jsx 
<hr/>

51. create getposts api route at server(C)
- create getposts route at post.route.js  
```javascript
  ...
  import { getposts } from '../controllers/post.controller.js';
  ...
  router.get('/getposts', getposts);
```
- create getposts controller in post.controller.js  
```javascript
  export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),);
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },});
    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
  };
```
<hr/>

52. show user posts inside dashboard at client(B)
- install scrollbar module at client(B)  
  > B> npm install --save-dev tailwind-scrollbar
  . add code to incdex.css
  ```css
    @plugin "tailwind-scrollbar";
  ```
- modify DashPosts.jsx  
```javascript
  import { useEffect, useState } from 'react';
  import { useSelector } from 'react-redux';
  import {Table,TableBody,TableHead,TableHeadCell,TableRow,TableCell,} from 'flowbite-react';
  import { Link } from 'react-router-dom';
  export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    console.log(userPosts);
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserPosts(data.posts);}
        } catch (error) {
          console.log(error);}};
      if (currentUser.isAdmin) {
        fetchPosts();}
    }, [currentUser._id, currentUser.isAdmin]);
    return (
      <div className="table-auto  overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <TableHead>
                <TableRow>
                  <TableHeadCell>Date Updated</TableHeadCell>
                  <TableHeadCell>Post Image</TableHeadCell>
                  ...
                </TableRow>
              </TableHead>
              {userPosts.map((post) => (
                <TableBody key={post._id} className="divide-y">
                  <TableRow >
                    <TableCell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </TableCell>
                    ...
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </>
        ) : (
          <p>You have no post yet!</p>
        )}
      </div>
    );
  }
```
<hr/>

53. show more posts inside dashboard at client(B)
- modify DashPosts.
```javascript
  ...
  const [showMore, setShowMore] = useState(true);
  ...
    if (res.ok) {
      setUserPosts(data.posts);
      if (data.posts < 9) {
        setShowMore(false);}
    }
  ...
  const handleShowMore = async () => {
  const startIndex = userPosts.length;
  try {
    const res = await fetch(
      `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
    );
    const data = await res.json();
    if (res.ok) {
      setUserPosts((prev) => [...prev, ...data.posts]);
      if (data.posts.length < 9) { setShowMore(false);}
    }
  } catch (error) {
    console.log(error);
  }
  };
  ...
      {showMore && (
      <button
        className="w-full text-teal-500 self-center text-sm py-7"
        onClick={handleShowMore}
      >
        Show More
      </button>
     )}
```
<hr/>

54. add delet post functionality at server(C) and client(B)
- modify post.route.js  
```javascript
  import {deletepost} from '../controllers/post.controller.js';
  ...
  router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
```
- modify post.controller.js  
```javascript
  export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, 'You are not authorized to delete this post!'),
    );}
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: 'Post deleted successfully!' });
  } catch (error) {
    next(error);}
  };
```
- modify DashPosts.jsx at client(B)  
```javascript
  ...
  import {Modal,ModalHeader,ModalBody,ModalFooter,Button,} from 'flowbite-react';
  import { HiOutlineExclamationCircle } from 'react-icons/hi';
  ...
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  ...
  const handleDeletePost = async () => {
  setShowModal(false);
  try {
    const res = await fetch(
      `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
      {method: 'DELETE',},);
    const data = await res.json();
    if (res.ok) {
      setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete),);
    } else {console.log(data.message);}
  } catch (error) {console.log(error);}};
  ...
  return (
    ...
      <span
        onClick={() => {
          setShowModal(true);
          setPostIdToDelete(post._id);}}>
        Delete
      </span>
    ...
      <Modal
      show={showModal}
      onClose={() => setShowModal(false)}
    >
      <ModalHeader>Delete Account</ModalHeader>
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="w-17 h-17 text-gray-400 dark:text-gray-200 mb-5 mx-auto" />
          <h3 className="mb-5 text-gray-500 dark:text-gray-200 text-lg">
            Are you sure you want to delete your post? This action cannot be
            undone^^
          </h3>
        </div>
      </ModalBody>
      <ModalFooter className="flex mx-auto gap-15">
        <Button onClick={() => setShowModal(false)}>Cancel</Button>
        <Button color="red" onClick={handleDeletePost}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
```
<hr/>

55. add update post functionaluty at server(C) and client(B)
- modify post.router.js at server(C)  
```javascript
  ...
  import {updatepost} from '../controllers/post.controller.js';
  ...
  router.put('/updatepost/:postId/:userId', verifyToken, updatepost);
```
- modify post.controller.js at server(C)  
```javascript
  export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, 'You are not authorized to update this post!'),);
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
```
- modify DashPosts.jsx at client(B)  
```javascript
  ...
         <Link
            to={`/update-post/${post._id}`}
          >
            <span>Edit</span>
          </Link>
```
- modify App.jsx at client(B)  
```javascript
  ...
  import UpdatePost from './pages/UpdatePost.jsx';
  ...
    <Route path="/update-post/:postId" element={<UpdatePost />} />
  ...
```
- create UpdatePost.jsx at client(B)
```javascript
  import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
  import ReactQuill from 'react-quill-new';
  import 'react-quill-new/dist/quill.snow.css';
  import { useEffect, useState } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import { useSelector } from 'react-redux';

  export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
      title: '',
      category: 'uncategorized',
      content: '',
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const res = await fetch(`/api/post/getposts?postId=${postId}`);
          const data = await res.json();
          if (res.ok) {
            if (data.posts && data.posts.length > 0) {
              setFormData(data.posts[0]);
            }
            setPublishError(null);
          } else {
            setPublishError(data.message);
          }
        } catch (error) {
          setPublishError(error.message);}};
      if (postId) {
        fetchPost();}
    }, [postId]);
    ...
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.title || !formData.content) {
        return setPublishError('All fields are required');
      }
      try {
        const res = await fetch(
          `/api/post/updatepost/${formData._id}/${currentUser._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          },
        );
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      } catch (error) {
        setPublishError(error.message);
      }
    };

    return (
      <div className="max-w-6xl p-3 mx-auto min-h-screen">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              value={formData.title || ''}
            />
            <Select
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              value={formData.category || 'uncategorized'}
            >
              <option value="uncategorized">Select a Category</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          ...
          <ReactQuill
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, content: value }));
            }}
            value={formData.content || ''}
          />
          <Button type="submit" color="green">
            Update Post
          </Button>
          {publishError && (
            <Alert color="failure" className="mt-5">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    );
  }
```
<hr/>

56. create get users api route at server(C)  
- modify user.route.js  
```javascript
  ...
  import {getUsers} from '../controllers/user.controller.js';
  ...
  router.get('/getusers', verifyToken, getUsers);
```
- modify user.controller.js  
```javascript
  export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not authorized!'));}
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(),);
    const lastMonthUsers = await User.countDocuments({createdAt: { $gte: oneMonthAgo },});
    res.status(200)
       .json({ users: userWithoutPassword, totalUsers, lastMonthUsers });
  } catch (error) {next(error);}
  };
```
<hr/>

57.  show users at admin dashboard in client(B)  
- modify sidebar at client(B)  (DashSidebar.jsx)  
```javascript
  ...
  {currentUser.isAdmin && (
    <SidebarItem as={Link} to="/dashboard?tab=users"
      active={tab === 'users'} icon={HiOutlineUserGroup}>
      Users
    </SidebarItem>)
  }
  ...
```
- modify Dashboard.jsx at client(B)  
```javascript
  import DashUsers from '../components/DashUsers';
  ...
    {tab === 'users' && <DashUsers />}
  ...
```
- create DashUsers.jsx at client(B)
```javascript
  ...
  export default function DashUsers() {
    const [users, setUsers] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState('');
    ...
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch(`/api/user/getusers`);
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users); //from user.controller.js
            if (data.users.length < 9) {setShowMore(false);}}
        } catch (error) { console.log(error); }
      };
      if (currentUser.isAdmin) { fetchUsers();} }, [currentUser]);
    const handleShowMore = async () => {
      const startIndex = users.length;
      try {
        const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => [...prev, ...data.users]);
          if (data.users.length < 9) { setShowMore(false);}}
      } catch (error) {console.log(error);}};
    const handleDeleteUser = async () => {
      setShowModal(false);
      try {
        const res = await fetch(
          `/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`,
          {method: 'DELETE',},);
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        } else { console.log(data.message);}
      } catch (error) {console.log(error);}
    };
    return (
      <div>
        {currentUser.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <TableHead>
                <TableRow>  
                  <TableHeadCell>Username</TableHeadCell>
                  <TableHeadCell>Delete</TableHeadCell>
                </TableRow>
              </TableHead>
              {users.map((user) => (
                <TableBody key={user._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </TableCell>
                    <TableCell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);}}>
                        Delete
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
            {showMore && (
              <button
                className="w-full text-teal-500 self-center text-sm py-7"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </>
        ) : (
          <p>You have no users to show</p>
        )}
        ...
      </div>
    );
  }
```
<hr/>

58. add delete user functionality at server(C) and client(B)
- modify user.controller.js at server(C)  
```javascript
  ...
  export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
      return next(errorHandler(401, 'You can delete only your own account!'));
    }
    ...
  }
```
- modify DashUser.jsx at client(B)  
```javascript
  ...
    const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      } else { console.log(data.message);}
    } catch (error) { console.log(error);}
    };
  ...
```

59. complete post page functionality at client(B)  
- add route at App.jsx  
```javascript
  ...
  import PostPage from './pages/Postpage.jsx';
  ...
    <Route path="/post/:postSlug" element={<PostPage />} />
  ...
```
- create Postpage.jsx  
```javascript
  import { Button, Spinner } from 'flowbite-react';
  import { useEffect, useState } from 'react';
  import { Link, useParams } from 'react-router-dom';
  export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    useEffect(() => {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
          const data = await res.json();
          console.log(data);
          if (!res.ok) {
            setLoading(false);
            setError(true);
            return;
          }
          setLoading(false);
          setError(false);
          setPost(data.posts[0]);
        } catch (error) {
          setLoading(false);
          setError(true);}};
      fetchPost(); }, [postSlug]);
    if (loading)
      return (
        <div className="flex justify-center items-center min-h-screen"><Spinner size="xl" /></div>
      );
    return (
      <main className="flex flex-col p-3 max-w-6xl mx-auto min-h-screen">
        <h1> {post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}`}>
          <Button color="gray" pill size="sm"> {post && post.category} </Button>
        </Link>
        <img src={post && post.image} alt={post && post.title}/>
        <div>
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span>{post && (post.content.length / 2).toFixed(0)} mins read</span>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
      </main>
    );
  }
```
- modify index.css  
```css
  .post-content p {
  margin-bottom: 0.5rem;
  }
  ...
  .post-content a {
    color: rgb(40, 40, 161);
    text-decoration: none;
  }
  .dark .post-content a {
    color: rgb(215, 170, 38);
  }
  ...
```
<hr/>

60. add call to action to the post page at client(B)  
- create CallToAction.jsx at component folder
```javascript
  import { Button } from 'flowbite-react';
  export default function CallToAction() {
    return (
      <div className="flex flex-col  gap-5 sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
        <div className="flex-1 justify-center flex flex-col">
          <h1 className="text-2xl">Want to learn more about Javascript?</h1>
          <p className="text-gray-700 dark:text-gray-200 my-2">
            Chaeck out resources at google
          </p>
          <Button className="mt-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-none rounded-tl-xl border-none">
            <a
              href="https://www.google.com"
              target="_blink"
              rel="noopener noreferrer"
            >
              Google
            </a>
          </Button>
        </div>
        <div className="p-2 flex-1">
          <img
            src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
            alt="image"
          />
        </div>
      </div>
    );
  }
```
- modify Postpage.jsx at pages folder  
```javascript
  import CallToAction from '../components/CallToAction';
  ...
    <div className="max-w-4xl mx-auto w-full ">
      <CallToAction />
    </div>
  ...
```
<hr/>
  
61. add comment section to the post page at client(B) and server(C)  
- create comment.model.js at models folder in server(C)  
```javascript
  import mongoose from 'mongoose';
  const commentSchema = new mongoose.Schema(
    {
      postId: {type: String, required: true,},
      content: {type: String, required: true,},
      userId: {type: String, required: true,},
      likes: {type: Array, default: [],},
      numberOfLikes: {type: Number, default: 0,},
    },
    { timestamps: true,},
  );
  const Comment = mongoose.model('Comment', commentSchema);
  export default Comment;
```
- add comment route at index.js in server(C)  
```javascript
  ...
  import commentRoutes from './routes/comment.route.js';
  ...
  app.use('/api/comment', commentRoutes);
```
- create comment.route.js at routes folder in server(C)  
```javascript
  import express from 'express';
  import { createComment } from '../controllers/comment.controller.js';
  import { verifyToken } from '../utils/verifyUser.js';
  const router = express.Router();
  router.post('/create', verifyToken, createComment);
  export default router;
```
- create comment.controller.js at controllers folder in server(C)  
```javascript
  import { errorHandler } from '../utils/error.js';
  import Comment from '../models/comment.model.js';
  export const createComment = async (req, res, next) => {
    try {
      const { content, postId, userId } = req.body;
      if (userId !== req.user.id) {
        return next(
          errorHandler(403, 'You are not authorized to create a comment!'),
        ); }
      if (!content || !postId || !userId) {
        return next(errorHandler(400, 'Text fields are required!'));
      }
      const newComment = new Comment({ content, postId, userId });
      await newComment.save();
      res.status(200).json(newComment);
    } catch (error) { next(error);}
  };
```
- make ScrollToTop.jsx at components folder in client(B)  
```javascript
  import { useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
  export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0);}, [pathname]);
    return null;
  }
```
- add ScrollToTop function at App.jsx in client(B)  
```javascript
  import ScrollToTop from './components/ScrollToTop.jsx';
  function App() {
    return (
      <BrowserRouter>
        <ScrollToTop />
      ..
    )
  }
```
- create CommentSection.jsx at components folder in client(B) 
```javascript
  import { Alert, Button, Textarea } from 'flowbite-react';
  import { useSelector } from 'react-redux';
  import { Link } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    useEffect(() => {
      if (commentError) {
        const timer = setTimeout(() => {setCommentError(null);}, 2000);
        return () => clearTimeout(timer);}}, [commentError]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (comment.length > 300) {return;}
      try {
        const res = await fetch('/api/comment/create', {
          method: 'POST', headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({
            postId, content: comment, userId: currentUser._id,}),});
        const data = await res.json();
        if (!res.ok) {
          setCommentError(data.message);
          return;}
        setComment('');
        setCommentError(null);
      } catch (error) {setCommentError(error.message);}};
    return (
      <div className="max-w-2xl mx-auto w-full p-3">
        {currentUser ? (
          <div>
            <p>Signed in as: </p>
            <img src={currentUser.profilePicture}/>
            <Link to="/dashboard?tab=profile"> {currentUser.username}</Link>
          </div>) : (
          <div>
            You must login to comment
            <Link to="/sign-in">
              Sign In
            </Link>
          </div> )}
        {currentUser && (
          <form onSubmit={handleSubmit}>
            <Textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}/>
            <div className="flex justify-between items-center">
              <p className="text-sm"> {300 - comment.length} haracters remaining </p>
              <Button outline color="green" type="submit">Submit</Button>
            </div>
            {commentError && ( <Alert color="red" className="mt-5">{commentError}</Alert>)}
          </form>
        )}
      </div>
    );
  }
```
- modify Postpage.jsx at pages folder in client(B)  
```javascript
  ...
  import CommentSection from '../components/CommentSection';
  ...
    <CommentSection postId={post._id} />
    ...
```
<hr/>

62. show comments to the post page at server(c) and client(B)  
- add comments route of post at comment.route.js in router folder 
```javascript
  import {getPostComments} from '../controllers/comment.controller.js';
  ...
  router.get('/getPostComments/:postId', getPostComments);
  ...
```
- add comments controller at comment.controller.js at server(C)  
```javascript
  export const getPostComments = async (req, res, next) => {
    try {
      const comments = await Comment.find({ postId: req.params.postId }).sort({createdAt: -1,});
      res.status(200).json(comments);
    } catch (error) {next(error);}
  };
```
- to get user info who commented, add user route at user.route.js in routes folder  
```javascript
  import {getuser} from '../controllers/user.controller.js';
  ...
  router.get('/:userId', getuser);
```
- add user controller at user.controller.js in controllers folder  
```javascript
  export const getuser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return next(errorHandler(404, 'User not found!'));
      }
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    } catch (error) {next(error)}
  };
```
- add exist comments at CommentSection.jsx at components folder in client
```javascript
import Comment from './Comment';
...
  const [comments, setComments] = useState([]);
  ...
  useEffect(() => {
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comment/getPostComments/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }} catch (error) {console.log(error);}};
  fetchComments();
  }, [postId]);
  ...
  const handleSubmit = async (e) => {
  ...
    setComments([data, ...comments]);
    ...
  }
  return (
    ...
    {comments.length === 0 ? (<div className="my-5 text-sm">No comments yet</div>) : (
    <>
      <div className="flex text-sm items-center my-3 gap-2">
        <p>Comments:</p>
        <div className="border border-slate-500 py-1 px-3 rounded-sm">
          <p>{comments.length}</p>
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />))}
    </>
    )}
  )
```
- create Comment.jsx at components folder in client  
```javascript
  import { useEffect, useState } from 'react';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);
  export default function Comment({ comment }) {
    const [user, setUser] = useState({});
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await fetch(`/api/user/${comment.userId}`);
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
        } catch (error) {console.log(error);}};
      getUser();}, [comment]);
    return (
      <div className="flex p-4 border-b border-slate-500 dark:border-gray-600 text-sm">
        <div className="shrink-0 mr-3">
          <img
            className="w-10 h-10 rounded-full bg-gray-200"
            src={user.profilePicture}
            alt={user.username}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="font-bold mr-2 text-xs truncate">
              {user ? `@${user.username}` : 'anonymous user'}
            </span>
            <span className="text-gray-500 text-xs dark:text-gray-200">
              {dayjs(comment.createdAt).fromNow()}
            </span>
          </div>
          <p className="text-gray-500 pb-2 dark:text-gray-200">
            {comment.content}
          </p>
        </div>
      </div>
    );
  }
```
<hr/>

63. add like functionality at comment component at server and client
- add like route at comment.route.js in routes folder  
```javascript
  import {likeComment,} from '../controllers/comment.controller.js';
  ...
  router.put('/likeComment/:commentId', verifyToken, likeComment);
```
- add like controller at comment.controller.js in controllers folder  
```javascript
  export const likeComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {return next(errorHandler(404, 'Comment not found!'));}
      const userIndex = comment.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.likes.push(req.user.id);
        comment.numberOfLikes++;
      } else {
        comment.likes.splice(userIndex, 1);
        comment.numberOfLikes--;
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {next(error);}
  };
```
- add handleLike function at CommentSection.jsx at components folder in client 
```javascript
  ...
  import { Link, useNavigate } from 'react-router-dom';
  ...
  const navigate = useNavigate();
  ...
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {navigate('/sign-in'); return;}
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',});
      if (res.ok) {
        const data = await res.json();
        setComments(comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,}
              : comment,),);
      }
    } catch (error) {console.log(error);}
  };
  ...
      {comments.map((comment) => (
      <Comment key={comment._id} comment={comment} onLike={handleLike} />
     ))}
  ...
```
- add like button at Comment.jsx
```javascript
  import { FaThumbsUp } from 'react-icons/fa';
  import { useSelector } from 'react-redux';
  ...
  export default function Comment({ comment, onLike }) {
    const { currentUser } = useSelector((state) => state.user);
    ...
          <div>
            <button
              onClick={() => onLike(comment._id)}>
              <FaThumbsUp className="text-sm" />
              <p> {comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' +
                  (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
            </button>
          </div>
    ...
  }
```

64. 11





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