import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./newPost.scss";

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const token = useSelector((state) => state.auth?.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!token) {
            setError("Необходима авторизация");
            setLoading(false);
            return;
        }

        const postData = {
            title,
            description,
            image,
            video,
        };

        try {
            const response = await axios.post("http://49.13.31.246:9191/post", postData, {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json",
                },
            });

            console.log("Ответ от сервера:", response.data);
            setSuccess("Пост успешно опубликован!");
            setTitle("");
            setDescription("");
            setImage("");
            setVideo("");
        } catch (error) {
            console.error("Ошибка при отправке поста:", error);
            setError("Ошибка при публикации поста");
        } finally {
            setLoading(false);
        }
    };
    const getEmbedUrl = (url) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/embed\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    };

    return (
        <div className="create-post-container">
            <h2>Создать пост</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="post-input"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="post-input"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <input
                    type="text"
                    className="post-input"
                    placeholder="Ссылка на изображение"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="text"
                    className="post-input"
                    placeholder="Ссылка на видео"
                    value={video}
                    onChange={(e) => setVideo(getEmbedUrl(e.target.value))}
                />
                <button type="submit" className="post-button" disabled={loading}>
                    {loading ? "Публикуется..." : "Опубликовать"}
                </button>
            </form>
        </div>
    );
};

export default NewPost;
