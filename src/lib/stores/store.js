
import  {readable} from 'svelte/store';

const api = readable("/api");

const panelPath = readable('/api/panel');
const panelUsersPath = readable('/api/panel/users/');
const panelHostInfoPath = readable('/api/panel/users/host/');
const panelBooking = readable('/api/panel/events/bookings/');
const business = readable('/api/panel');
const openMarket = readable('/api/panel/market');
const panelProducts = readable('/api/panel/market/products');
const panelTransactions = readable('/api/panel/transactions');
const userOrders = readable('/api/panel/market/orders');
const userCart = readable('/api/panel/market/cart');


//
const panelCertifications= readable('/api/panel/certifications');
const panelTemplates= readable('/api/panel/certifications/templates');
const panelCertificates= readable('/api/panel/certifications/certificates');
const panelEvents= readable('/api/panel/events');
const panelAdvertisements= readable('/api/panel/events/advertisements');
// const panelCertificateConfiguations= readable('/api/panel/certifications/certificates');



export default {
    paths:{
        api,
        business,
        panelPath,
        openMarket,
        openMarketProducts:panelProducts,
        openMarketOrders: userOrders,
        openUserCart: userCart,
        panelCertificates,
        panelTemplates,
        panelEvents,
        panelAdvertisements,
        panelUsersPath,
        panelHostInfoPath,
        panelTransactions,
        panelBooking,
    }
};


