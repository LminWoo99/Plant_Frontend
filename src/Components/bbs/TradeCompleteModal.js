// components/TradeCompleteModal.js
import React from "react";
import "../../css/TradeCompleteModal.css";

function TradeCompleteModal({ onClose }) {
    return (
        <div className="overlay" onClick={onClose}>
            <div className="trade-complete-modal">
                <h3>거래가 완료되었습니다.</h3>
                
            </div>
        </div>
    );
}

export default TradeCompleteModal;
