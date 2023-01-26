import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  OrderByDirection,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { projectFirestore } from '../firebase/config';

const useFirestore = (
  coll?: string,
  category?: string | string[] | undefined,
  callType?: string
) => {
  const [docs, setDocs] = useState<any[]>();
  // useEffect(() => {
  //   const colRef = collection(projectFirestore, coll);
  //   let descRef;
  //   if (category && callType) {
  //     descRef = query(colRef, where(callType, '==', category));
  //   } else {
  //     descRef = query(colRef, orderBy('category', 'asc'));
  //   }
  //   onSnapshot(descRef, (snapshot) => {
  //     let documents: any[] = [];
  //     snapshot.docs.forEach((doc) => {
  //       documents.push({ ...doc.data() });
  //     });
  //     setDocs(documents);
  //   });
  // }, [coll, category]);

  const fetchFirestore = async (
    coll: string,
    filtField?: string | null,
    filtFieldValue?: string | null,
    orderField?: string,
    orderDir?: OrderByDirection | undefined
  ) => {
    let docs: any[] = [];
    try {
      let q;
      if (filtField && filtFieldValue && orderField && orderDir) {
        q = query(
          collection(projectFirestore, coll),
          where(filtField, '==', filtFieldValue),
          orderBy(orderField, orderDir)
        );
      } else if (orderField && orderDir) {
        q = query(
          collection(projectFirestore, coll),
          orderBy(orderField, orderDir)
        );
      } else if (filtField && filtFieldValue) {
        q = query(
          collection(projectFirestore, coll),
          where(filtField, '==', filtFieldValue)
        );
      } else {
        q = query(collection(projectFirestore, coll));
      }
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        docs.push(data);
      });
    } catch (err) {
      console.log(err);
    }
    return docs;
  };

  const addCategory = (category: string, img?: string | null) => {
    const id = v4();
    try {
      setDoc(doc(projectFirestore, 'categories', id), {
        id: id,
        category: category,
        coverImg: img ? img : null,
        timeCreated: new Date(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateCategory = (
    id: string,
    category: string,
    img?: string | null
  ) => {
    try {
      setDoc(doc(projectFirestore, 'categories', id), {
        id: id,
        category: category,
        coverImg: img ? img : null,
        timeCreated: new Date(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = (id: string) => {
    const docRef = doc(projectFirestore, 'categories', id);
    deleteDoc(docRef)
      .then(() => {
        console.log('Category deleted');
      })
      .catch((err) => console.log(err));
  };

  const addSubCategory = (
    category: string,
    subcategory: string,
    img?: string | null
  ) => {
    const id = v4();
    try {
      setDoc(doc(projectFirestore, 'subcategories', id), {
        id: id,
        subcategory: subcategory,
        category: category,
        coverImg: img ? img : null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateSubCategory = (
    id: string,
    category: string,
    subcategory: string,
    img?: string | null
  ) => {
    try {
      setDoc(doc(projectFirestore, 'subcategories', id), {
        id: id,
        category: category,
        subcategory: subcategory,
        coverImg: img ? img : null,
        timeCreated: new Date(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSubCategory = (id: string) => {
    const docRef = doc(projectFirestore, 'subcategories', id);
    deleteDoc(docRef)
      .then(() => {
        console.log('Subcategory deleted');
      })
      .catch((err) => console.log(err));
  };

  return {
    docs,
    fetchFirestore,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
  };
};

export default useFirestore;
