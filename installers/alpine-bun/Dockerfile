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

FROM --platform=$TARGETOS/$TARGETARCH alpine:latest

LABEL author="Otter Networks" maintainer="dev@otter.win"

LABEL org.opencontainers.image.source="https://github.com/OtterServers/deps"
LABEL org.opencontainers.image.licenses=MIT

# Install Deps needed to install Bun
RUN apk add --update --no-cache gcc libstdc++ libgcc ca-certificates curl git jq wget bash nano sudo

SHELL ["/bin/bash", "-c"]

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
RUN cp ~/.bun/bin/bun /bin/bun

# Verify Bun Install
RUN bun --version

# Make sure file is saved as bun.ts
RUN wget -q https://raw.githubusercontent.com/OtterServers/deps/refs/heads/main/langs/bun.ts
RUN bun build --compile --outfile=bunish bun.ts
RUN mv bunish /bin/
