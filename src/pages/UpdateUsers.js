
import { Box, Container, Grid, Typography } from '@mui/material';
import ProfileAvatarUser from '../components/ProfileAvatarUser';
import FormUpdateUsers from '../components/FormUpdateUsers';


const UpdateUsers = () => (
    <>

        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h2" component="div" sx={{ mb: 7,  textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
                    Atualizar usuário
                </Typography>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                    >
                        <ProfileAvatarUser/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                      <FormUpdateUsers/>   
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
);



export default UpdateUsers;
