import React, { useState } from 'react';

import EditRuleModal from './EditRuleModal'; // To be implemented

import ViewRuleModal from './ViewRuleModal'; // To be implemented

import './RuleTable.css'; // CSS for styling

const RuleTable = ({ rules }) => {
  const [selectedRule, setSelectedRule] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [allRules, setAllRules] = useState(rules);

  const handleViewClick = (rule) => {
    setSelectedRule(rule);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (rule, isNew = false) => {
    setSelectedRule({ ...rule, isNew, "Rule Desc": isNew ? '' : rule["Rule Desc"] });
    setIsEditModalOpen(true);
  };

  const handleAddRow = () => {
    setNewRows((prevRows) => [
      ...prevRows,
      { id: '', title: '', desc: '', isNew: true },
    ]);
  };

  const handleDeleteRow = (index) => {
    setNewRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    setNewRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleSaveRow = (index) => {
    const rowToSave = newRows[index];
    setAllRules((prevRules) => [...prevRules, rowToSave]);
    handleDeleteRow(index);
  };

  return (
    <div className="rule-table-container">
      <div className="header">
        <h1 className="title">Movie Telecast Rule</h1>
      </div>
      <table className="rule-table">
        <thead>
          <tr>
            <th>Rule Id</th>
            <th>Rule Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Existing rules */}
          {allRules.map((rule) => (
            <tr key={rule['Rule Id']}>
              <td>{rule['Rule Id']}</td>
              <td>
                <strong>{rule['Rule Title']}</strong>
                <p className="rule-description">{rule['Rule Desc']}</p>
              </td>
              <td>
                <button
                  className="view-button"
                  onClick={() => handleViewClick(rule)}
                >
                  View
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(rule)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {/* Newly added rows */}
          {newRows.map((row, index) => (
            <tr key={`new-row-${index}`}>
              <td>
                <input
                  type="text"
                  value={row.id}
                  onChange={(e) =>
                    handleInputChange(index, 'id', e.target.value)
                  }
                  placeholder="Enter Rule Id"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.title}
                  onChange={(e) =>
                    handleInputChange(index, 'title', e.target.value)
                  }
                  placeholder="Enter Rule Title"
                />
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(row, true)}
                >
                  Edit
                </button>
                <button
                  className="save-button"
                  onClick={() => handleSaveRow(index)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-row-container">
        <button className="add-row-button" onClick={handleAddRow}>
          + Add Row
        </button>
        <button className="delete-button" onClick={() => handleDeleteRow(newRows.length - 1)}>
          Delete Last Row
        </button>
      </div>

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
