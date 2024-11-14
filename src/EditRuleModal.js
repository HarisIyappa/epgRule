import React, { useState } from 'react';
 
const EditRuleModal = ({ rule, closeModal }) => {
  const [editedRule, setEditedRule] = useState(rule);
  const [selectedCondition, setSelectedCondition] = useState(rule["Condition"]);
  const [result, setResult] = useState(rule["Result"]);
  const [conditions, setConditions] = useState([{ field: '', expression: '', value: '' }]);
  const [ruleType, setRuleType] = useState('Recommendation');
 
  const handleConditionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCondition(selectedValue);
 
    // Based on condition selection, update result
    if (selectedValue === 'AND') {
      setResult({ "Parameter": "Time Slot", "End Result": ["Prime Time"] });
    } else if (selectedValue === 'OR') {
      setResult({ "Parameter": "Time Slot", "End Result": ["Late Night"] });
    }
  };
 
  const handleFieldChange = (index, event) => {
    const newConditions = [...conditions];
    newConditions[index][event.target.name] = event.target.value;
    setConditions(newConditions);
  };
 
  const addCondition = () => {
    setConditions([...conditions, { field: '', expression: '', value: '' }]);
  };
 
  const deleteCondition = (index) => {
    if (index > 0) {
      const newConditions = conditions.filter((_, i) => i !== index);
      setConditions(newConditions);
    }
  };
 
  const handleSave = () => {
    // You can integrate saving logic here (e.g., API call to update the rule)
    console.log('Updated Rule:', editedRule);
    closeModal();
  };
 
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Rule: {rule["Rule Title"]}</h2>
        <label>
          Rule Type:
          <select value={ruleType} onChange={(e) => setRuleType(e.target.value)}>
            <option value="Strict">Strict</option>
            <option value="Recommendation">Recommendation</option>
          </select>
        </label>
        <br />
        {ruleType === 'Strict' && (
          <label>
            Rule Precedence:
            <input
              type="number"
              value={editedRule["Rule Precedence"]}
              onChange={(e) => setEditedRule({ ...editedRule, "Rule Precedence": e.target.value })}
            />
          </label>
        )}
        <br />
        <label>
          Rule Description:
          <textarea
            value={editedRule["Rule Desc"]}
            onChange={(e) => setEditedRule({ ...editedRule, "Rule Desc": e.target.value })}
          />
        </label>
        <br />
        <label>
          Condition:
          <select onChange={handleConditionChange}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </label>
        <br />
        {conditions.map((condition, index) => (
          <div key={index} className="condition-row">
            <label>
              Field:
              <select name="field" value={condition.field} onChange={(e) => handleFieldChange(index, e)}>
                <option value="">Select Field</option>
                <option value="pc_rating">PC Rating</option>
                <option value="imdb_rating">IMDB Rating</option>
                <option value="genres">Genres</option>
              </select>
            </label>
            <label>
              Expression:
              <select name="expression" value={condition.expression} onChange={(e) => handleFieldChange(index, e)}>
                <option value="">Select Expression</option>
                <option value="<=">&lt;=</option>
                <option value=">=">&gt;=</option>
                <option value="==">==</option>
                <option value="!=">!=</option>
              </select>
            </label>
            <label>
              Value:
              <select name="value" value={condition.value} onChange={(e) => handleFieldChange(index, e)}>
                {condition.field === 'pc_rating' && (
                  <>
                    <option value="NC-17">NC-17</option>
                    <option value="R">R</option>
                    <option value="PG-13">PG-13</option>
                    <option value="PG">PG</option>
                    <option value="G">G</option>
                  </>
                )}
                {condition.field === 'imdb_rating' && (
                  <>
                    {[...Array(20).keys()].map(i => (
                      <option key={i} value={(i + 1) / 2}>{(i + 1) / 2}</option>
                    ))}
                  </>
                )}
                {condition.field === 'genres' && (
                  <>
                    <option value="Drama">Drama</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Romance">Romance</option>
                    <option value="Action">Action</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Horror">Horror</option>
                    <option value="Crime">Crime</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Action Thriller">Action Thriller</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Family">Family</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Animation">Animation</option>
                    <option value="Cartoon">Cartoon</option>
                    <option value="Fantasy">Fantasy</option>
                  </>
                )}
              </select>
            </label>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button style={{ fontSize: 'small' }} onClick={addCondition}>Add More Condition</button>
          <button style={{ fontSize: 'small' }} onClick={() => deleteCondition(conditions.length - 1)}>Delete</button>
        </div>
        <br />
        <label>
          Result:
          <select value={result["End Result"]} onChange={(e) => setResult({ ...result, "End Result": [e.target.value] })}>
            <option value="Time slot">Time slot</option>
            <option value="Mid Night (12:00 AM - 04:00 AM)">Mid Night (12:00 AM - 04:00 AM)</option>
            <option value="Early Morning (04:00 AM - 07:30 AM)">Early Morning (04:00 AM - 07:30 AM)</option>
            <option value="Morning Time (07:30 AM - 10:30 AM)">Morning Time (07:30 AM - 10:30 AM)</option>
            <option value="Late Morning (10:30 AM - 12:00 PM)">Late Morning (10:30 AM - 12:00 PM)</option>
            <option value="Afternoon Time (12:00 PM - 04:30 PM)">Afternoon Time (12:00 PM - 04:30 PM)</option>
            <option value="Evening Time (04:30 PM - 07:00 PM)">Evening Time (04:30 PM - 07:00 PM)</option>
            <option value="Prime Time (07:00 PM - 10:00 PM)">Prime Time (07:00 PM - 10:00 PM)</option>
            <option value="Late Night (10:00 PM - 11:59 PM)">Late Night (10:00 PM - 11:59 PM)</option>
          </select>
        </label>
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={closeModal}>Cancel</button>
       
      </div>
    </div>
  );
};
 
export default EditRuleModal;
 
 