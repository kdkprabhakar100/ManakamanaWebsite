import { useState, useEffect } from "react";
import {
  collection, onSnapshot, addDoc, updateDoc,
  deleteDoc, doc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

const COL = "products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // Live listener — updates whenever Firestore changes
  useEffect(() => {
    const q = query(collection(db, COL), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const addProduct = (data) =>
    addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp() });

  const updateProduct = (id, data) =>
    updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });

  const deleteProduct = (id) =>
    deleteDoc(doc(db, COL, id));

  return { products, loading, addProduct, updateProduct, deleteProduct };
}
