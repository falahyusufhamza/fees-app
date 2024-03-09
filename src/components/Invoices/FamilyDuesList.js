import React, { Fragment } from 'react'
import FamilyDueCard from './FamilyDueCard'
import { Divider } from 'antd';

function FamilyDuesList({
    familyDues = [],
    setCurrentFamily = () => {},
    currentFamily,
}) {
  return (
    <div className="dues-list">
      {familyDues?.map((family) => (
        <Fragment key={family?.familyId}>
            <FamilyDueCard
                key={family?.familyId}
                family={family}
                setCurrentFamily={setCurrentFamily}
                currentFamily={currentFamily}
            />
            <Divider />
        </Fragment>
      ))}
    </div>
  );
}

export default FamilyDuesList