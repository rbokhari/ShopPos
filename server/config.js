// Hold application configs

module.exports = {

    secret: 'abcasdfkjaslkdfj',
    serverListeningPort: 3090,
    mongoDBAddress: 'mongodb+srv://admin:gJ8h9qYonG0xprrg@clusterve-fpnnh.mongodb.net/coffee_shop?retryWrites=true&w=majority', // 'mongodb://127.0.0.1:27017/KarakExpress',
    // mongoDBAddress: 'mongodb://localhost:27017/coffeeshop', // 'mongodb://127.0.0.1:27017/KarakExpress',
    socketIOAddress: '*http://0.0.0.0:3090',
    // role: {
    //     'ADMIN': 1,
    //     'BRANCH_ADMIN': 2,
    //     'BRANCH_USER': 3
    // }
};