export function buildOrderQuery (order, desc){
    if(order){
        return desc ? `ORDER BY ${order} DESC`: `ORDER BY ${order}`;
    }
    return "";
}