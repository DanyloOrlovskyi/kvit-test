import React, { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { rootStore } from "../stores";

const AuthDialog: React.FC = () => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const onAuth = (key: string) => {
    rootStore.auth.setApiKey(key);
  };

  const handleSubmit = () => {
    if (key.length < 8) {
      setError("API ключ має містити мінімум 8 символів");
      return;
    }
    onAuth(key);
    setError("");
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={true}>
      <DialogTitle>Авторизація</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Введіть ваш унікальний API ключ для доступу до системи
        </Typography>
        <TextField
          autoFocus
          fullWidth
          label="API Key"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          error={!!error}
          helperText={
            error || "Для демо використайте будь-який ключ (мін. 8 символів)"
          }
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" fullWidth>
          Увійти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthDialog;
