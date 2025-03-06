import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./posts.scss";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth?.token);
    const userId = "67c6dda5f8f1aa5f3e93c0ea";

    useEffect(() => {
        const fetchPosts = async () => {
            if (!token) {
                console.log("Токен отсутствует в Redux");
                setError("Необходима авторизация");
                setLoading(false);
                return;
            }

            console.log("Токен найден:", token);

            try {
                const response = await axios.get("http://49.13.31.246:9191/posts", {
                    headers: {
                        "x-access-token": token,
                    },
                });

                console.log("Ответ от сервера:", response.data);

                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    setError("Некорректный формат данных от сервера");
                }
            } catch (error) {
                console.error("Ошибка при загрузке постов:", error);
                setError("Ошибка загрузки постов");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [token]);

    const likePost = async (postId) => {
        try {
            await axios.post(
                `http://49.13.31.246:9191/like`,
                { post_id: postId },
                { headers: { "x-access-token": token } }
            );

            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p._id === postId ? { ...p, likes: [...p.likes, { fromUser: userId }] } : p
                )
            );
        } catch (error) {
            console.error(`Ошибка при лайке поста ${postId}:`, error);
        }
    };

    const dislikePost = async (postId) => {
        try {
            await axios.delete(`http://49.13.31.246:9191/like/${postId}`, {
                headers: { "x-access-token": token },
            });

            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p._id === postId
                        ? { ...p, likes: p.likes.filter((like) => like.fromUser !== userId) }
                        : p
                )
            );
        } catch (error) {
            console.error(`Ошибка при дизлайке поста ${postId}:`, error);
        }
    };

    const deletePost = async (postId) => {
        try {
            await axios.delete(`http://49.13.31.246:9191/post/${postId}`, {
                headers: { "x-access-token": token },
            });

            setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
        } catch (error) {
            console.error(`Ошибка при удалении поста ${postId}:`, error);
        }
    };

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="posts-container">
            {posts.map((post, index) => {
                const user = post.user && post.user.length > 0 ? post.user[0] : null;
                const userName = user ? user.username : "Неизвестный пользователь";
                const userAvatar = user?.avatar || "https://via.placeholder.com/40";
                const postLikes = post.likes.length || 0;
                const isLikedByUser = post.likes.some((like) => like.fromUser === userId);
                const isUserPost = user ? user._id === userId : false;

                return (
                    <div className="post-card" key={index}>
                        <div className="post-header">
                            <img className="avatar" src={userAvatar} alt={userName} />
                            <h3>{userName}</h3>
                        </div>
                        <h2 className="post-title">{post.title}</h2>
                        <div className="post-content">
                            {post.image && <img className="post-image" src={post.image} alt="Post" />}
                            {post.video && post.video !== "any" && (
                                <video className="post-video" controls>
                                    <source src={post.video} type="video/mp4" />
                                </video>
                            )}
                            <p className="post-description">{post.description}</p>
                        </div>
                        <div className="post-footer">
                            <button className="like-button" onClick={() => likePost(post._id)}>
                                {isLikedByUser ? "❤️" : "🤍 Like"} {postLikes}
                            </button>
                            {isLikedByUser && (
                                <button className="dislike-button" onClick={() => dislikePost(post._id)}>
                                    👎 Dislike
                                </button>
                            )}
                            {isUserPost && (
                                <button className="delete-button" onClick={() => deletePost(post._id)}>
                                    DELETE
                                </button>
                            )}
                            <span className="post-date">
                                {post.trDate ? new Date(post.trDate).toLocaleString() : "Дата неизвестна"}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;

