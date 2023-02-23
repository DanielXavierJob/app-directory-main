"use client"
import { ExternalLink } from '#/ui/ExternalLink';
import { SkeletonCard } from '#/ui/SkeletonCard';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import Members from '#/pages/members/member';
import _debounce from '#/lib/debounce';
import Button from '@mui/material/Button';
import ModalAddMember from '#/components/modal/modalAddMember';

const Page: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [timeout, setTimer] = useState<NodeJS.Timeout>();

  return (
    <div className="space-y-4">
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <h1 className="text-xl font-medium text-gray-400/80">Membros</h1>
        </Grid>
        <Grid item xs={12} md={10} alignItems={'center'} display={'flex'} justifyContent={'end'}>
          <Grid container spacing={1} alignItems={"center"}>
            <Grid item  md={6} justifyContent={'end'} display={{ xs: "none", md: "flex" }} >
              <ModalAddMember />
            </Grid>
            <Grid item xs={12} justifyContent={'center'} display={{ xs: "flex", md: "none" }}>
            <ModalAddMember />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                sx={{ width: '100%', paddingRight: 1, paddingLeft: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Pesquise um membro</InputLabel>
                <OutlinedInput
                  type={"text"}
                  fullWidth
                  onKeyUp={(event: any) => {
                    if (event.target.value != '') {
                      setLoading(true)
                      _debounce(() => {
                        setFilterValue(event.target.value)
                        setLoading(false)
                      }, 2000, timeout, setTimer)
                    } else {
                      setLoading(false)
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Pesquise um membro"
                />
              </FormControl>

            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Members filter={filterValue} loadingProps={loading} />
    </div>
  );
}

export default Page
