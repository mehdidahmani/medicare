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
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';

const TimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ Id_Heure: null, Heure: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);

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

  const handleGenerateSlots = async () => {
    if (!duration || duration <= 0) {
      setError('Please enter a valid duration');
      return;
    }

    if (window.confirm(`This will delete all existing time slots and generate new ones with ${duration} minute intervals. Continue?`)) {
      setLoading(true);
      setError('');
      setSuccess('');
      try {
        const response = await axios.post('http://localhost:3001/heures/generate/slots', {
          duration: parseInt(duration),
        });
        setSuccess(response.data.message);
        fetchTimeSlots();
      } catch (err) {
        setError(err.response?.data?.error || 'Error generating time slots');
        console.error(err);
      } finally {
        setLoading(false);
      }
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
      <h1>Time Slots Management</h1>

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

      <Card sx={{ mb: 3 }}>
        <CardHeader title="Generate Time Slots" />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Appointment Duration (minutes)</InputLabel>
              <Select
                value={duration}
                label="Appointment Duration (minutes)"
                onChange={(e) => setDuration(e.target.value)}
              >
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={45}>45 minutes</MenuItem>
                <MenuItem value={60}>60 minutes</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateSlots}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
            >
              Generate Slots (8 AM - 5 PM)
            </Button>
          </Box>
          <Box sx={{ mt: 2, fontSize: '0.9rem', color: '#666' }}>
            This will create time slots from 8:00 AM to 5:00 PM with the selected interval.
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title={`Current Time Slots (${timeSlots.length})`}
          action={
            <Button variant="outlined" size="small" onClick={() => handleOpenDialog()}>
              Add Manual Slot
            </Button>
          }
        />
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center', py: 3, color: '#999' }}>
                    No time slots configured. Generate slots or add manually.
                  </TableCell>
                </TableRow>
              ) : (
                timeSlots.map((slot) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

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
