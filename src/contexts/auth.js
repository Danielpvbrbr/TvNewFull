import React, { useState, createContext, useEffect, useRef } from 'react';
export const AuthContext = createContext({});
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, FlatList, Keyboard } from 'react-native';

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [clearField, setClearField] = useState(false);
    const [urlValue, setUrlValue] = useState(null)
    const [urlFilmes, setUrlFilmes] = useState(null)
    const [altCategory, setAltCategory] = useState(null)
    const [urlC, setUrlC] = useState('https://5a1c76baf08c0.streamlock.net/sbtinterior/5zh9uodi13msma1k88k05qz9nrc2bg1q/chunklist_w1082302368.m3u8');
    const [valueFavorites, setValueFavories] = useState(null);
    const [listFavorites, setListFavorites] = useState([]);
    const [statusFavorito, setStatusFavorito] = useState(true);
    const [deleteFavorito, setDeleteFavorito] = useState([]);

    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const [valueColor, setValueColor] = useState(null);
    const [statusBack, setStatusBack] = useState(false);
    const [colorText, setColorText] = useState('#000');

    const controllAim = useRef(new Animated.Value(0)).current;
    const controllOpc = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        if (statusBack === true) {
            setValueColor('rgb(26,26,26)');
        } else {
            setValueColor('#564EFF');
        }

    }, [statusBack]);

    useEffect(() => {
        if (valueColor === '#000') {
            setColorText('#fff');
        } else if (valueColor === '#564EFF') {
            setColorText('#fff');
        } else {
            setColorText('#fff');
        }
    }, [valueColor]);


    useEffect(() => {
        async function getColor() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
                setStatusBack(snapshot.val().dark)
            })
        };
        getColor()
    });

    useEffect(() => {
        async function loadingStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadingStorage()
    }, [])


    //Funcao para logar o usario
    async function signIn(email, password) {
        setLoadingAuth(true);
        Keyboard.dismiss();
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.database().ref('users').child(uid).once('value')
                    .then((snapshot) => {
                        let data = {
                            uid: uid,
                            nome: snapshot.val().nome,
                            email: value.user.email,
                            dark: snapshot.val().dark
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
            })
            .catch((error) => {
                alert(error.code);
                setLoadingAuth(false);
                setClearField(true);
            });
    };

    //Cadastrar usuario
    async function signUp(email, password, nome) {
        setLoadingAuth(true);
        Keyboard.dismiss();
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.database().ref('users').child(uid).set({
                    nome: nome,
                    dark: statusBack
                }).then(() => {
                    let data = {
                        uid: uid,
                        nome: nome,
                        email: value.user.email,
                    };
                    setUser(data);
                    storageUser(data);
                    setLoadingAuth(false);

                })
                    .catch((err) => {
                        alert(err.code)
                        setLoadingAuth(false);
                        setClearField(true);
                    })
            })
    };

    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    useEffect(() => {

        async function urlGet() {
            const urlGet = await firebase.storage().ref().child(user && user.uid);

            urlGet.getDownloadURL().then(function (url) {
                // console.log(url);
                setNewImage(url)
                console.log(newImage)
            });

        };

        urlGet();

    });

    async function signOut() {
        await firebase.auth().signOut();
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
                setNewImage(null);
                setImage(null);
            })
    };

    function controllView() {

        Animated.sequence([
            Animated.timing(controllAim, {
                toValue: 1,
                duration: 500,
            }),

            Animated.timing(controllAim, {
                toValue: 0,
                duration: 3340,
            }),

        ]).start();

        Animated.sequence([
            Animated.timing(controllOpc, {
                toValue: 1,
                duration: 800,
            }),
            Animated.timing(controllOpc, {
                toValue: 0,
                duration: 3340,

            })
        ]).start()

    };

    function getVal(value) {
        setAltCategory(value);
    };

    function selectList(value) {
        setUrlFilmes('');
        setUrlValue(value);
    };

    function selectFilmes(value) {
        setUrlC('');
        setUrlValue('');
        setUrlFilmes(value.url);
        controllView();
        setValueFavories(value);

        const verify = listFavorites.filter(pers => pers.url === value.url)
        setStatusFavorito(verify.length == 0)

        const verifyDell = verify.map(pers => pers.id)
        setDeleteFavorito(verifyDell)
    };

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            loadingAuth,
            clearField,
            urlValue,
            urlFilmes,
            altCategory,
            urlC,
            controllAim,
            controllOpc,
            valueFavorites,
            listFavorites,
            statusFavorito,
            deleteFavorito,
            valueColor,
            colorText,
            statusBack,
            image,
            newImage,
            signUp,
            signIn,
            signOut,
            getVal,
            selectList,
            selectFilmes,
            setUrlFilmes,
            controllView,
            setValueFavories,
            setListFavorites,
            setStatusFavorito,
            setValueColor,
            setStatusBack,
            setImage,
            setNewImage
        }}>
            {children}

        </AuthContext.Provider>
    );
}
