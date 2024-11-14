import React from 'react';
 
const ViewRuleModal = ({ rule, closeModal }) => {

  return (
<div className="modal">
<div className="modal-content">
<h2>View Rule: {rule["Rule Title"]}</h2>
<p><strong>Rule Id:</strong> {rule["Rule Id"]}</p>
<p><strong>Rule Precedence:</strong> {rule["Rule Precedence"]}</p>
<p><strong>Rule Description:</strong> {rule["Rule Desc"]}</p>
<p><strong>Rule Short Description:</strong> {rule["Rule Short Desc"]}</p>
<p><strong>Condition:</strong> {JSON.stringify(rule["Condition"])}</p>
<p><strong>Result:</strong> {JSON.stringify(rule["Result"])}</p>
<button onClick={closeModal}>Close</button>
</div>
</div>

  );

};
 
export default ViewRuleModal;

 