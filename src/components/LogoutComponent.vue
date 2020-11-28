<script>
import config from '../config'
const APIURL = config.API_URL ;
// console.log(APIURL);
import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout";


export default {
  name: "LogoutComponent",
  created() {
    this.logout()
    this.$emit("update:layout", DefaultLayout);
  },
  data() {
    return {
      password: "",
      email: "",
      errors: [],
      loginErrorMsg: "",
    };
  },
  methods: {
    logout() {
      
        const data = {
          email: this.email,
          password: this.password,
        };
        // console.log( config.API_URL );
        const response = axios.post (APIURL+`logout`, data,  {
          headers: {
            "Authorization" : "Bearer "+localStorage.getItem("currencyIsUserLogin"),
            "Content-Type": "application/json",
          },
        });
        if(response){

          response
          .then(() => {
            console.log('LOGOUT')
            localStorage.removeItem("currencyIsUserLogin");
             window.location.href = window.location.origin;

          })
          .catch(() => {
            localStorage.removeItem("currencyIsUserLogin");

             window.location.href = window.location.origin;
          });
        }
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>