import Header from "../../components/Hearder";


function Login() {
    return (
        <div>
            <Header />
            <div class="bg-gray-100 flex justify-center items-center  ">
                <div class="w-full max-w-xs">

                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-[50px]">
                        <h2 class="text-center text-2xl font-bold mb-6">Login</h2>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Username
                            </label>
                            <input
                                type="text"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input
                                type="text"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="flex items-center justify-between">
                            <button class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                LOGIN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;