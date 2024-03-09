import { UserOutlined } from '@ant-design/icons'
import React from 'react'

function FamilyDueCard({
  family,
  setCurrentFamily,
  currentFamily,
}) {
  return (
    <div className={`family-due-card ${currentFamily?.familyId === family?.familyId ? "active" : ""}`} onClick={() => setCurrentFamily(family)}>
      <div className='left'>
        <UserOutlined/>
        <div className='family-name'>{family?.family?.familyName}</div>
      </div>
      <div className='right'><span className='omr'>OMR</span> {family?.pendingFamilyDues}</div>
    </div>
  )
}

export default FamilyDueCard