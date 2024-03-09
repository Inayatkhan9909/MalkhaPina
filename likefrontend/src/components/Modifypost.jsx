
import "../styles/Modify.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Modifypost = ({ postId }) => {

    const navigate = useNavigate();

    const handledeletepost = async () => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this post?');

            if (confirmed) {
                const token = localStorage.getItem('token');
               
                const formData = {
                    postId: postId,
                    token: token
                };
                    console.log(postId)
                const response = await axios.post("http://localhost:4000/post/delete", formData)

                if (response.data === "post deleted succesfully") {
                    toast.success(response.data.message)
                    navigate("/")
                }
                else {
                    toast.error(response.data.message)
                }
            }
        }
        catch (error) {
            console.log(error)
        }



    }

    const handleEditPost = async () =>{
            navigate(`/EditPost/${postId}`);
            
    }





    return (

        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <div className='Modifypost_container'>


                <ul>
                    <li>
                        <button onClick={handledeletepost}>Delete Post</button>
                    </li>
                    <li>
                        <button onClick={handleEditPost}>Edit Post</button>
                    </li>
                    <li>
                        <button >Report</button>
                    </li>
                </ul>


            </div>

        </>
    )
}

export default Modifypost