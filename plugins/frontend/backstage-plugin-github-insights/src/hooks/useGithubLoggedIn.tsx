/*
 * Copyright 2024 Larder Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect, useState } from 'react';
import {
  useApi,
  githubAuthApiRef,
  SessionState,
} from '@backstage/core-plugin-api';
import { Grid, Tooltip, Button, Typography } from '@material-ui/core';

export const GithubNotAuthorized = () => {
  const githubApi = useApi(githubAuthApiRef);
  return (
    <Grid container>
      <Grid item xs={8}>
        <Typography>
          You are not logged into github. You need to be signed in to see the
          content of this card.
        </Typography>
      </Grid>
      <Grid item xs={4} container justifyContent="flex-end">
        <Tooltip placement="top" arrow title="Sign in to Github">
          <Button
            variant="outlined"
            color="primary"
            // Calling getAccessToken instead of a plain signIn because we are going to get the correct scopes right away. No need to second request
            onClick={() => githubApi.getAccessToken('repo')}
          >
            Sign in
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export const useGithubLoggedIn = () => {
  const githubApi = useApi(githubAuthApiRef);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    githubApi.getAccessToken('repo', { optional: true });
    const authSubscription = githubApi.sessionState$().subscribe(state => {
      if (state === SessionState.SignedIn) {
        setIsLoggedIn(true);
      }
    });
    return () => {
      authSubscription.unsubscribe();
    };
  }, [githubApi]);

  return isLoggedIn;
};
