import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import AuthError from "./Components/authentError";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { app } from '../../firebaseConfig';

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


export default function Authent() {
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const router = useRouter();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Google authentication successful
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        router.push("/index");
      })
      .catch((error) => {
        // Error during Google authentication
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
        setErrorMessage(errorMessage);
      });
      
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isNewAccount) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
        setErrorMessage("Invalid email address");
        setError(true);
      } else if (
        !RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
        ).test(password)
      ) {
        setErrorMessage(
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
        );
        setError(true);
      } else {
        if (isNewAccount){
            createUserWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    // User registered successfully
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    // Error registering user
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(true);
                    setErrorMessage(errorMessage);
                });
        }         
        setError(false);
      }
    } else {
        signInWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    // User signed in successfully
                    const user = userCredential.user;
                    console.log(user);
                    
                })
                .catch((error) => {
                    // Error signing in user
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(true);
                    setErrorMessage(errorMessage);
                });
    }
    router.push("/home");
  }

  const handleLoginClick = () => {
    setIsNewAccount(false);
  };

  const handleSignupClick = () => {
    setIsNewAccount(true);
  };

    function handleCloseError(): void {
        setError(false);
    }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      {error && (
        <AuthError error={errorMessage} onClose={handleCloseError} />
        
      )}
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img src="/lostPetsLogo.png" width={300} className="mx-auto" />
          <div className="mt-5 space-y-2">
            {isNewAccount ? (
              <h3 className="text-stone-400 text-4xl font-bold sm:text-3xl">
                Sign up
              </h3>
            ) : (
              <h3 className="text-stone-400 text-2xl font-bold sm:text-3xl">
                Log in
              </h3>
            )}
            {isNewAccount ? (
              <p className="">
                Already have an account?{" "}
                <a
                  href="javascript:void(0)"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={handleLoginClick}
                >
                  Log in
                </a>
              </p>
            ) : (
              <p className="">
                Don't have an account?{" "}
                <a
                  href="javascript:void(0)"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={handleSignupClick}
                >
                  Sign up
                </a>
              </p>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
          style={!isNewAccount ? { display: "none" } : {}}
        >
          <div>
            <label className="font-medium">Email</label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMail(e.target.value)}
              value={mail}
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

            <div>
                <label className="font-medium">Password</label>
                <input
                onChange={(e) => setPassword(e.target.value)} value={password}
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
            <button
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
                Create account
            </button>
            </form>
            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
                style={isNewAccount ? { display: "none" } : {}}
                >
                <div>
                <label className="font-medium">Email</label>
                <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
            <div>
                <label className="font-medium">Password</label>
                <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
            <button
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
                Log in
            </button>
            </form>
            <button onClick={signInWithGoogle} className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_17_40)">
                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    Continue with Google
                </button>
                </div>
            </main>
        )
}

