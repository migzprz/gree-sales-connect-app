/**
GOAL: Get details on a particular quotation
- this includes qoutation data like client info, quotation items like product, parts and services
**/

/** implementation style: different queries that will be merged as an object containing the different values **/

/** client information **/ 
/** -- /client name, date the quotation was generated, the company tin, the business style? and the address **/
SELECT q.date_created, CONCAT(cp.last_name, ", ", cp.first_name) as client_name, 
CONCAT(l.addr_bldg_no, " ", l.addr_street_name, " ", b.name, ", ", m.name, ", ", l.zipcode, " ", p.name) as site_address,
co.tin, co.company_name
FROM td_quotations q
JOIN md_quotation_clients qc ON q.quotation_client_id = qc.quotation_client_id
JOIN md_clients c ON qc.client_id = c.client_id
JOIN md_contactperson cp ON c.contact_person_id = cp.contact_person_id
JOIN md_companies co ON c.company_id = co.company_id
JOIN md_locations l ON qc.location_id = l.location_id
JOIN md_provinces p ON l.addr_province_id = p.province_id
JOIN md_municipalities m ON l.addr_municipality_id = m.municipality_id
JOIN md_barangays b ON l.addr_barangay_id = b.barangay_id
WHERE q.quotation_id = 9;

/** products information **/ 
/** -- quantity, unit, articles, unit price, amount **/
SELECT *, qp.discounted_price_each*qp.quantity AS totalPrice, p.product_srp, p.unit_model, CONCAT(product_hp, ' HP ', UPPER(product_type), ' TYPE ', CASE WHEN is_inverter = 1 THEN 'INVERTER' WHEN is_inverter = 0 THEN 'NON-INVERTER' END) as display
FROM md_quotation_products qp
JOIN md_products p ON qp.product_id = p.product_id
WHERE qp.quotation_id = 12