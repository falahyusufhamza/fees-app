import React from 'react'
import {groupBy} from "lodash";
import InvoicePDF from '../InvoicePDF/InvoicePDF';

function FamilyInvoice({
    family,
    invoiceData,
}) {
  return (
    <>
        {!family && <div className='empty-placeholder'>
            Please select a family to view invoice
        </div>}
        {!!family && <InvoicePDF familyDetails={family} memberFeeData={groupBy(invoiceData, "passenger.name")} />}
    </>
  )
}

export default FamilyInvoice