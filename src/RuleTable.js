import React, { useState } from 'react';

import EditRuleModal from './EditRuleModal'; // We'll create this modal next

import ViewRuleModal from './ViewRuleModal'; // We'll create this modal next
 
const RuleTable = ({ rules }) => {

  const [selectedRule, setSelectedRule] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
 
  const handleViewClick = (rule) => {

    setSelectedRule(rule);

    setIsViewModalOpen(true);

  };
 
  const handleEditClick = (rule) => {

    setSelectedRule(rule);

    setIsEditModalOpen(true);

  };
 
  return (
<div>
<table border="1" style={{ width: '100%' }}>
<thead>
<tr>
<th>Rule Id</th>
<th>Rule Title</th>
<th>Actions</th>
</tr>
</thead>
<tbody>

          {rules.map(rule => (
<tr key={rule["Rule Id"]}>
<td>{rule["Rule Id"]}</td>
<td>{rule["Rule Title"]}</td>
<td>
<button onClick={() => handleViewClick(rule)}>View</button>
<button onClick={() => handleEditClick(rule)}>Edit</button>
</td>
</tr>

          ))}
</tbody>
</table>
 
      {isViewModalOpen && (
<ViewRuleModal

          rule={selectedRule}

          closeModal={() => setIsViewModalOpen(false)}

        />

      )}
 
      {isEditModalOpen && (
<EditRuleModal

          rule={selectedRule}

          closeModal={() => setIsEditModalOpen(false)}

        />

      )}
</div>

  );

};
 
export default RuleTable;

 