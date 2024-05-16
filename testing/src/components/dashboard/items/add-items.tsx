import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import styles from './add-items.module.css';
import { FaPlusCircle } from 'react-icons/fa'; // Import ikon bulat tambah

const AddItems: React.FC = () => { 
    const [name, setName] = useState<string>("");
    const [variant, setVariant] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imagevariant, setImageVariant] = useState<File | null>(null);
    const [imagebackground, setImageBackground] = useState<File | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [formVisible, setFormVisible] = useState<boolean>(false); // State untuk mengontrol keterlihatan form

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('variant', variant);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }
            if (imagevariant) { 
                formData.append('imagevariant', imagevariant);
            }
            if (imagebackground) { 
                formData.append('imagebackground' , imagebackground);
            }

            const response = await axiosInstance.post('/api/items', formData);
            console.log(response);

            setNotice("Item berhasil ditambahkan");
            setFormVisible(false); // Sembunyikan form setelah submit berhasil
        } catch (error) {
            console.log(error);
            setNotice("Gagal menambahkan item");    
        } 
    }

    return (
        <div className={styles.addItem__container}>
            <div className={styles.addItem__content}>
                {/* Tampilkan ikon bulat tambah */}
                <div className={styles.addButtonWrapper}>
                    <FaPlusCircle 
                        className={styles.addItem__toggleForm} 
                        onClick={() => setFormVisible(!formVisible)}
                        style={{ fontSize: '2.5em'}} 
                    />
                </div>
                {/* Tampilkan form jika formVisible true */}
                {formVisible && (
                    <div className={styles.formContainer}>
                        <div className={styles.formWrapper}>
                            <h1 className={styles.title}>Add New Items</h1>
                            <button className={styles.popup__close} onClick={() => setFormVisible(false)}>X</button>
                            {notice && <p>{notice} {name}</p>} {/* Tampilkan pemberitahuan */}
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <input className={styles.input__text_name}type="text" placeholder="Name Item" value={name} onChange={(e) => setName(e.target.value)} />
                                <input className={styles.input__text}type="text" placeholder="Variant" value={variant} onChange={(e) => setVariant(e.target.value)} />
                                <input className={styles.input__text}type="text" placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} />
                                <p>Image Home</p>
                                <input
                                className={styles.input__file} 
                                    type="file" 
                                    name="image" 
                                    accept="image/*" 
                                    required 
                                    onChange={(e) => {
                                        const selectedFile = e.target.files ? e.target.files[0] : null;
                                        setImage(selectedFile);
                                    }} 
                                />
                                <p>Image Item Variant</p>
                                <input
                                    className={styles.input__file} 
                                    type="file" 
                                    name="image" 
                                    accept="image/*"  
                                    onChange={(e) => {
                                        const selectedFile = e.target.files ? e.target.files[0] : null;
                                        setImageVariant(selectedFile);
                                    }} 
                                />
                                <p>Image Item Variant Background</p>
                                <input 
                                    className={styles.input__file}
                                    type="file" 
                                    name="image" 
                                    accept="image/*" 
                                    placeholder="ImageBackground"
                                    required 
                                    onChange={(e) => {
                                        const selectedFile = e.target.files ? e.target.files[0] : null;
                                        setImageBackground(selectedFile);
                                    }} 
                                />
                                <button className={styles.button} type="submit">Tambah</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddItems;
