import { Link } from "react-router-dom";


const ContactPage = () => {
    return ( 
        <div className="content">
            <h2>Contact Us</h2>
            <p>Thank you for choosing Quick Buy! We are dedicated to providing you with a 
                seamless shopping experience. If you have any questions, concerns, or 
                feedback, we're here to help. Please find our contact information below:
            </p>
            <h3>Contact Details:</h3>
            <p><strong>Company Name:</strong>Quick Buy</p>
            <p><strong>Address:</strong>123 Main Street, City, State, Postal Code</p>
            <p><strong>Phone: </strong>+1 (123) 456-7890</p>
            <p><strong>Email: </strong>info@quickbuy.com</p>
            <p><strong>Fax: </strong>+1 (123) 456-7891</p>
            
            <h3>Customer Support:</h3>
            <p>Our friendly customer support team is available to assist you. We aim to provide 
                timely and helpful assistance for all your inquiries.
            </p>
            
            <p><strong>Contact Hours:</strong> Monday to Friday: 9:00 AM to 6:00 PM (Eastern Time)</p>
            <p><strong>Phone: </strong>For immediate assistance, please call our customer support line at +1 (123) 456-7890.</p>
            <p><strong>Email:</strong> You can also reach us by email at support@quickbuy.com.</p>
            <p><strong>Live Chat:</strong> Connect with us through the live chat feature on our website for real-time assistance.</p>
            
            <h3>Frequently Asked Questions (FAQs):</h3>
            <p>
            Before reaching out to our support team, you may find answers to common questions in 
            our FAQ section. Visit our FAQ page <Link to={'/faq'}>here</Link>  to find information on 
            order tracking, returns, payment methods, and more.
            </p>
            <h3>Social Media Presence:</h3>
            <p>
                Stay connected with Quick Buy and get the latest updates, promotions, and news 
                by following us on social media:
                <p><strong>Facebook:</strong> [Link to your Facebook page]</p>
                <p><strong>Twitter:</strong> [Link to your Twitter handle]</p>
                <p><strong>Instagram:</strong> [Link to your Instagram profile]</p>
            </p>
            <h3>Feedback and Suggestions:</h3>
            <p>
                We value your feedback and suggestions as they help us improve our services. 
                If you have any comments, suggestions, or need to report an issue, please email 
                us at feedback@quickbuy.com or use the contact form below.
            </p>
            <h3>Business Inquiries:</h3>
            <p>
                For business collaborations, partnerships, or wholesale inquiries, we would love 
                to hear from you. Please email us at partnerships@quickbuy.com or use the contact 
                form below, and our team will get back to you promptly.
            </p>
        </div>
     );
}
 
export default ContactPage;