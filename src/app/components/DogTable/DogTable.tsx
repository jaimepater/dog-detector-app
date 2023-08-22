'use client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import { DogGetRequest, DogsType } from '@/types/dogs';
import { useQuery } from '@tanstack/react-query';
import { fetchCreateDevice, fetchDogs } from '@/lib/api';
import localforage from 'localforage';
import { CreateDevice } from '@/types/devices';
import { useUser } from '@auth0/nextjs-auth0/client';

interface DogTableProps {
  token: string;
}

const DogTable = ({ token }: DogTableProps) => {
  const [selectedImage, setSelectedImage] = useState('');
  const { user } = useUser();
  const [pagination, setPagination] = useState<DogGetRequest>({
    limit: 10,
    page: 1,
    type: DogsType.BIG_DOG,
  });
  const { data, isLoading, error } = useQuery(
    ['dog', ...Object.values(pagination)],
    () => fetchDogs(pagination, token),
  );
  const { limit, page, type } = pagination;

  useEffect(() => {
    // Check for errors and force logout if there is an error
    console.log('error', error);
    if (error) {
      window.location.href = '/api/auth/logout'; // Redirect to the logout endpoint
    }
  }, [error]);

  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
  };

  const sendDeviceToken = async () => {
    const deviceToken = await localforage.getItem('fcm_token');
    if (deviceToken) {
      const device: CreateDevice = {
        user: user?.email as string,
        token: deviceToken as string,
      };
      const response = await fetchCreateDevice(device, token);
      console.log('response', response);
    }
  };

  useEffect(() => {
    if (user?.email) {
      sendDeviceToken();
    }
  }, [user?.email]);

  const handleCloseModal = () => {
    setSelectedImage('');
  };

  const handleChangePagination = (pag: DogGetRequest) => {
    setPagination((prevState) => ({
      ...prevState,
      ...pag,
    }));
  };

  const handleDownload = async (imageUrl: string) => {
    const id = imageUrl.split('/').pop();
    const constructedURL = imageUrl.replace(id || '', `source/${id}`);
    const link = document.createElement('a');
    link.href = constructedURL;
    link.setAttribute('download', `source_${id}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => handleChangePagination({ type: DogsType.BIG_DOG })}
          >
            Big Dogs
          </Button>
          <Button
            variant="contained"
            onClick={() => handleChangePagination({ type: DogsType.DOG })}
          >
            Dogs
          </Button>
        </Stack>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <h2>{type}</h2>
      </Box>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.dogs?.map((dog) => (
              <TableRow key={dog._id}>
                <TableCell onClick={() => handleOpenModal(dog.image)}>
                  <img src={dog.image} alt="Dog" width="50" height="50" />
                </TableCell>
                <TableCell onClick={() => handleDownload(dog.image)}>{`${moment(
                  dog.date,
                )
                  .format('LLL')
                  .replace('AM', 'am')
                  .replace('PM', 'pm')
                  .replace('M', '')} (${moment(
                  dog.date,
                ).fromNow()})`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.totalCount || 0}
        rowsPerPage={limit || 10}
        page={page ? page - 1 : 0}
        onPageChange={(_, newPage) =>
          handleChangePagination({ page: newPage + 1 })
        }
        onRowsPerPageChange={(event) =>
          handleChangePagination({ limit: parseInt(event.target.value, 10) })
        }
      />
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          title="dog"
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default DogTable;
