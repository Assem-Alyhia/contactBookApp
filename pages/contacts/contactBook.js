import ContactBook from '../../components/Home/contacts/ContactBook';
import Layout from "@/components/Utility/Layout";
const ContactBook_ = () => {
    return ( 
        <div>
            <ContactBook/>
        </div>
    );
}

ContactBook.getLayout = (page) => {
return <Layout>{page}</Layout>;
};


export default ContactBook_;