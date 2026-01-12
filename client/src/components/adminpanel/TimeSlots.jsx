import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ Id_Heure: null, Heure: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const response = await axios.get('http://localhost:3001/heures');
      setTimeSlots(response.data);
    } catch (err) {
      setError('Error fetching time slots');
      console.error(err);
    }
  };

  const handleOpenDialog = (slot = null) => {
    if (slot) {
      setFormData({ Id_Heure: slot.Id_Heure, Heure: slot.Heure });
      setIsEditing(true);
    } else {
      setFormData({ Id_Heure: null, Heure: '' });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ Id_Heure: null, Heure: '' });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, Heure: value });
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!formData.Heure) {
      setError('Time is required');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3001/heures/${formData.Id_Heure}`, {
          Heure: formData.Heure,
        });
        setSuccess('Time slot updated successfully');
      } else {
        await axios.post('http://localhost:3001/heures', {
          Heure: formData.Heure,
        });
        setSuccess('Time slot added successfully');
      }
      fetchTimeSlots();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving time slot');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      try {
        await axios.delete(`http://localhost:3001/heures/${id}`);
        setSuccess('Time slot deleted successfully');
        fetchTimeSlots();
      } catch (err) {
        setError(err.response?.data?.error || 'Error deleting time slot');
        console.error(err);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Time Slots Management</h1>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Add New Time Slot
        </Button>
      </Box>

      {error && (
        <Box sx={{ mb: 2, p: 2, bgcolor: '#ffebee', borderRadius: 1, color: '#c62828' }}>
          {error}
        </Box>
      )}
      {success && (
        <Box sx={{ mb: 2, p: 2, bgcolor: '#e8f5e9', borderRadius: 1, color: '#2e7d32' }}>
          {success}
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((slot) => (
              <TableRow key={slot.Id_Heure}>
                <TableCell>{slot.Id_Heure}</TableCell>
                <TableCell>{slot.Heure}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(slot)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(slot.Id_Heure)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Time Slot' : 'Add New Time Slot'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={formData.Heure}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeSlots;
