import { Modal, Select, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URLS } from '../../apiUrls';

function GenerateFeeModal({
  isVisible,
  generateFee = () => {},
  onClose = () => {},
}) {

    const [feeStructures, setFeeStructures] = useState([]);
    const [selectedFeeStruct, setSelectedFeeStruct] = useState();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsDisabled(true);
            axios.get(API_URLS.GET_FEE_STRUCTURES).then((res) => {
                if (res?.data?.success) {
                    setFeeStructures(res?.data?.data);
                } else {
                    throw new Error("Something went wrong");
                }
                setIsDisabled(false);
            }).catch((error) => {
                setIsDisabled(false);
                console.error(error);
            })
        }
    }, [isVisible])
  return (
    <Modal
      open={isVisible}
      title={
        <div className="modal-header">
          <p className="modal-title">Generate fee</p>
        </div>
      }
      children={<div className="generate-fee-modal-content">
        <label>Select month: </label>
        <Select
            placeholder="Select month"
            options={feeStructures}
            value={selectedFeeStruct}
            onChange={(value) => setSelectedFeeStruct(value)}
            disabled={isDisabled}
            loading={isDisabled}
        />
      </div>}
      okText="Proceed"
      okButtonProps={{
        disabled: isDisabled,
      }}
      onOk={() => {
        if (!selectedFeeStruct) {
            message.error("Select a month!");
            return;
        }
        generateFee(selectedFeeStruct, (success) => {
            setIsDisabled(false);
            if (success) onClose();
        });
    }}
      onCancel={onClose}
    />
  );
}

export default GenerateFeeModal;
