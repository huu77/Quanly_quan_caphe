import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from './../../components/Hearder/index';
import { useGetAllProfileQuery, usePostLoginMutation } from '../../apis/slices/Account';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [postLogin] = usePostLoginMutation();
    const navigate = useNavigate();
    const { data } = useGetAllProfileQuery()
    const onSubmit = async (data) => {
        try {
            const response = await postLogin(data).unwrap();
            console.log("🚀 ~ onSubmit ~ response:", response);
            if (response.statusCode === 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.error('Login failed:', err);
            toast.error(err.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="bg-gray-100 flex justify-center items-center">
                <div className="w-full max-w-xs">
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-[50px]"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
                                {...register('username', { required: 'Username is required' })}
                            />
                            {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
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
