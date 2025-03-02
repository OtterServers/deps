#
# Copyright (c) 2025 Otter Networks
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

FROM --platform=$TARGETOS/$TARGETARCH debian:bullseye-slim

LABEL author="Otter Networks" maintainer="dev@otter.win"

LABEL org.opencontainers.image.source="https://github.com/OtterServers/deps"
LABEL org.opencontainers.image.licenses=MIT

ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt update \
    && apt upgrade -y \
    && apt -y --no-install-recommends install ca-certificates curl bash unzip

# Use Bash after install deps via apt
SHELL ["/bin/bash", "-c"]

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# COPY entrypoint.sh /usr/local/bin/entrypoint.sh
# Too lazy to understand how to actually use the COPY command in Github Actions
RUN echo '#!/bin/bash' > /usr/local/bin/entrypoint.sh && \
    echo 'LAST_ARG="${@: -1}"' >> /usr/local/bin/entrypoint.sh && \
    echo 'if [ ! -f "$LAST_ARG" ]; then' >> /usr/local/bin/entrypoint.sh && \
    echo '    echo "Error: File '\''$LAST_ARG'\'' does not exist."' >> /usr/local/bin/entrypoint.sh && \
    echo '    exit 1' >> /usr/local/bin/entrypoint.sh && \
    echo 'fi' >> /usr/local/bin/entrypoint.sh && \
    echo 'cat "$LAST_ARG" | ~/.bun/bin/bun run -' >> /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Test if file runs via bun
# COPY install.sh /mnt/install/install.sh

# Verify Bun installation
RUN ~/.bun/bin/bun --version

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
