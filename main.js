var app = new Vue({
    el: ".container",
    data: {
        products: [
            { id: 1, title: "Sunflower", short_text: "sunflower_1", image: 'sunflower-1.png', desc: '' },
            { id: 2, title: "Sunflower", short_text: "sunflower_2", image: 'sunflower-2.png', desc: '' },
            { id: 3, title: "Suflower", short_text: "sunflower_3", image: 'sunflower-3.png', desc: '' },
            { id: 4, title: "Sunflower", short_text: "sunflower_4", image: 'sunflower-4.png', desc: '' },
            { id: 5, title: "Sunflower", short_text: "sunflower_5", image: 'sunflower-5.png', desc: '' },
        ],
        product: [{}],
        cart: [],
        contactFields: [
            { caption: 'Name', text: '' },
            { caption: 'Company Name', text: '' },
            { caption: 'Position', text: '' },
            { caption: 'City', text: '' },
            { caption: 'Country', text: '' },
            { caption: 'Telephone', text: '' },
            { caption: 'Email', text: '' },
            { caption: 'You are a', text: '' },
            { caption: 'If other, please specify', text: '' },
            { caption: 'You are interested in', text: '' },
        ],
        btnVisible: 0,
        formVisible: 1,
    },

    methods: {
        getProduct: function () {
            if (window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if (this.products && this.products.length > 0) {
                    for (i in this.products) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id)
                            this.product = this.products[i];
                    }
                }
            }
        },

        addToCart: function (id) {
            var cart = [];

            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }

            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible = 1;
            }
        },

        checkInCart: function () {
            if (this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) 
                this.btnVisible = 1;
        },

        getCart: function () {
            var storage = [];
            storage = localStorage.getItem('cart').split(',')
            for (i in this.products) {
                if (storage.indexOf(String(this.products[i].id)) != -1) {
                    this.cart.push(this.products[i])
                }
            }
        },
        
        removeFromCart: function (id) {
            var storage = [];
            storage = window.localStorage.getItem('cart').split(',')

            storage = storage.filter(storageId => storageId != id)
            window.localStorage.setItem('cart', storage.join())

            this.cart = this.cart.filter(item => item.id != id)
        },

        makeOrder: function () {
            localStorage.clear();
            this.cart.splice(0, this.cart.length)
            this.formVisible = 0
        },
    },

    mounted: function () {
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },

});