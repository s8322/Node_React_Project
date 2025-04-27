
import React, { useState, useEffect } from 'react';
import { ApartmentService } from './ApartmentService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApartments } from '../../slices/apartmentSlice'; // עדכן את הנתיב 
import NavBar from '../NavBar';

const Apartments = () => {
//     const dispatch = useDispatch();
//     const apartments = useSelector((state) => state.apartments.items);
//     const loading = useSelector((state) => state.apartments.loading);

    // useEffect(() => {
    //     dispatch(fetchApartments());
    // }, [dispatch]);

    // if (loading) return <div>Loading...</div>;
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    useEffect(() => {
        ApartmentService.getProducts().then((data) => setProducts(data.slice(0, 12)));
    }, []);

    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={"תמונה לא נמצאה"} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <span className="flex align-items-center gap-2">
                                <i className="pi pi-map-marker"></i>
                                <span className="font-semibold">{`${product.address.city}, ${product.address.neighborhood}`}</span>
                            </span>
                            <div className="text-2xl font-bold text-900">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
                            {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                            {/* <span className="font-semibold">{product.description}</span> */}
                            
                            <div className="flex align-items-center gap-3">
                                <span className="font-semibold">{product.description}</span>

                                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                            <Button icon="pi pi-heart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-map-marker"></i>
                            <span className="font-semibold">{`${product.address.city}, ${product.address.neighborhood}`}</span>
                        </div>
                        {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={"תמונה לא נמצאה"} />
                        <div className="text-2xl font-bold">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
                        {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                        <span className="font-semibold">{product.description}</span>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        {/* <span className="text-2xl font-semibold">₪{product.price.toFixed(2)}</span> */}
                        <Button icon="pi pi-heart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (<>
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
            
        {/* <div className="card">
            <DataView value={apartments} listTemplate={listTemplate} layout={layout} header={header()} />
        </div> */}
        </>
        );
    };

    return (
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}
export default Apartments

// import React, { useEffect } from 'react';
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { classNames } from 'primereact/utils';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchApartments } from '../../slices/apartmentSlice'; // עדכן את הנתיב 

// const Apartments = () => {
//     const dispatch = useDispatch();
    
//     // 1. השתמש ב-apartments מחנות Redux
//     const apartments = useSelector((state) => state.apartments.items);
//     const loading = useSelector((state) => state.apartments.loading);
    
//     // הוסף כאן את ה-useState, בחלק העליון של רכיב הקומפוננטה
//     const [layout, setLayout] = React.useState('grid'); 

//     useEffect(() => {
//         dispatch(fetchApartments());
//     }, [dispatch]);

//     // 2. אם ה-loading נמצא ב true, החזר תצוגת "טוען" 
//     if (loading) return <div>Loading...</div>;

//     const listItem = (product, index) => {
//         return (
//             <div className="col-12" key={product._id}> {/* השתמש ב-_id עבור המפתח */}
//                 <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
//                     <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.img[0]}`} alt={"תמונה לא נמצאה"} />
//                     <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//                         <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                             <span className="flex align-items-center gap-2">
//                                 <i className="pi pi-map-marker"></i>
//                                 <span className="font-semibold">{`${product.address.city}, ${product.address.neighborhood}`}</span>
//                             </span>
//                             <div className="text-2xl font-bold text-900">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
//                             <div className="flex align-items-center gap-3">
//                                 <span className="font-semibold">{product.description}</span>
//                             </div>
//                         </div>
//                         <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                             <span className="text-2xl font-semibold">₪{product.price}</span>
//                             <Button icon="pi pi-heart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const gridItem = (product) => {
//         return (
//             <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}> {/* השתמש ב-_id עבור המפתח */}
//                 <div className="p-4 border-1 surface-border surface-card border-round">
//                     <div className="flex flex-wrap align-items-center justify-content-between gap-2">
//                         <div className="flex align-items-center gap-2">
//                             <i className="pi pi-map-marker"></i>
//                             <span className="font-semibold">{`${product.address.city}, ${product.address.neighborhood}`}</span>
//                         </div>
//                     </div>
//                     <div className="flex flex-column align-items-center gap-3 py-5">
//                         <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.img[0]}`} alt={"תמונה לא נמצאה"} />
//                         <div className="text-2xl font-bold">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
//                         <span className="font-semibold">{product.description}</span>
//                     </div>
//                     <div className="flex align-items-center justify-content-between">
//                         <span className="text-2xl font-semibold">₪{product.price}</span>
//                         <Button icon="pi pi-heart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const itemTemplate = (product, layout, index) => {
//         if (!product) {
//             return;
//         }

//         if (layout === 'list') return listItem(product, index);
//         else if (layout === 'grid') return gridItem(product);
//     };

//     const listTemplate = (products, layout) => {
//         return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
//     };

//     const header = () => {
//         return (
//             <div className="flex justify-content-end">
//                 <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//             </div>
//         );
//     };

//     return (
//         <div className="card">
//             <DataView value={apartments} listTemplate={listTemplate} layout={layout} header={header()} />
//         </div>
//     )
// }

// export default Apartments;

// import React, { useEffect } from 'react';
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { classNames } from 'primereact/utils';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchApartments } from '../../slices/apartmentSlice'; // עדכן את הנתיב 

// const Apartments = () => {
//     const dispatch = useDispatch();
    
//     const apartments = useSelector((state) => state.apartments.items); // שליפת הדירות מה-state
//     const loading = useSelector((state) => state.apartments.loading); // בדוק אם הנתונים עדיין טוענים

//     const [layout, setLayout] = React.useState('grid'); // ניהול מצב התצוגה

//     useEffect(() => {
//         dispatch(fetchApartments()); // טעינת הדירות עם dispatch
//     }, [dispatch]);

//     if (loading) return <div>Loading...</div>; // החזר טוען בזמן טעינת הנתונים

//     const listItem = (product, index) => {
//         return (
//             <div className="col-12" key={product._id}>
//                 <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
//                     <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.img[0]}`} alt={"תמונה לא נמצאה"} />
//                     <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//                         <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                             <span className="flex align-items-center gap-2">
//                                 <i className="pi pi-map-marker"></i>
//                                 <span className="font-semibold">{`${product.address.city}, ${product.address.neighborhood}`}</span>
//                             </span>
//                             <div className="text-2xl font-bold text-900">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
//                             <div className="flex align-items-center gap-3">
//                                 <span className="font-semibold">{product.description}</span>
//                             </div>
//                         </div>
//                         <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                             <span className="text-2xl font-semibold">₪{product.price}</span>
//                             <Button icon="pi pi-heart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const gridItem = (product) => {
//         return (
//             <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
//                 <div className="p-4 border-1 surface-border surface-card border-round">
//                     <div className="flex flex-wrap align-items-center justify-content-between gap-2">
//                         <div className="flex align-items-center gap-2">
//                             <i className="pi pi-map-marker"></i>
//                             <span className="font-semibold">{`${product.address.city}, ${product.address.neighborhood}`}</span>
//                         </div>
//                     </div>
//                     <div className="flex flex-column align-items-center gap-3 py-5">
//                         <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.img[0]}`} alt={"תמונה לא נמצאה"} />
//                         <div className="text-2xl font-bold">{`${product.size} מ"ר ${product.numOfRooms} חדרים`}</div>
//                         <span className="font-semibold">{product.description}</span>
//                     </div>
//                     <div className="flex align-items-center justify-content-between">
//                         <span className="text-2xl font-semibold">₪{product.price}</span>
//                         <Button icon="pi pi-heart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const itemTemplate = (product, layout, index) => {
//         if (!product) {
//             return;
//         }

//         if (layout === 'list') return listItem(product, index);
//         else if (layout === 'grid') return gridItem(product);
//     };

//     const listTemplate = (products) => {
//         return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
//     };

//     const header = () => {
//         return (
//             <div className="flex justify-content-end">
//                 <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//             </div>
//         );
//     };

//     return (
//         <div className="card">
//             <DataView value={apartments} listTemplate={listTemplate} layout={layout} header={header()} />
//         </div>
//     );
// }

// export default Apartments;