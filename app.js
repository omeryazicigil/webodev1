Vue.component('contact-form', {
    data() {
        return {
            name: '',
            email: '',
            message: '',
            errors: {
                name: '',
                email: '',
                message: '',
            },
            submittedData: null
        };
    },
    methods: {
        validateForm() {
            this.errors = {
                name: '',
                email: '',
                message: '',
            };

            if (!this.name) {
                this.errors.name = 'İsim gereklidir.';
            }
            if (!this.email) {
                this.errors.email = 'E-posta gereklidir.';
            } else if (!this.validEmail(this.email)) {
                this.errors.email = 'Geçerli bir e-posta adresi giriniz.';
            }
            if (!this.message) {
                this.errors.message = 'Mesajınızı giriniz.';
            }
        },
        validEmail(email) {
            var re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        submitForm() {
            this.validateForm();
            if (this.errors.name || this.errors.email || this.errors.message) {
                return;
            }
            this.submittedData = {
                name: this.name,
                email: this.email,
                message: this.message
            };
        },
        resetForm() {
            this.name = '';
            this.email = '';
            this.message = '';
            this.errors = {
                name: '',
                email: '',
                message: ''
            };
            this.submittedData = null;
        }
    },
    template: `
        <div>
            <h1>İletişim Formu</h1>
            <form @submit.prevent="submitForm">
                <div>
                    <label>İsim:</label>
                    <input type="text" v-model="name">
                    <span style="color:red">{{ errors.name }}</span>
                </div>
                <div>
                    <label>E-posta:</label>
                    <input type="text" v-model="email">
                    <span style="color:red">{{ errors.email }}</span>
                </div>
                <div>
                    <label>Mesaj:</label>
                    <input type="text" v-model="message">
                    <span style="color:red">{{ errors.message }}</span>
                </div>
                <div>
                    <button type="button" @click="validateForm">Kontrol Et</button>
                    <button type="submit">Gönder</button>
                    <button type="button" @click="resetForm">Temizle</button>
                </div>
            </form>
            <div v-if="submittedData">
                <h2>Gönderilen Bilgiler:</h2>
                <p><strong>İsim:</strong> {{ submittedData.name }}</p>
                <p><strong>E-posta:</strong> {{ submittedData.email }}</p>
                <p><strong>Mesaj:</strong> {{ submittedData.message }}</p>
            </div>
        </div>
    `
});

new Vue({
    el: '#app'
});
