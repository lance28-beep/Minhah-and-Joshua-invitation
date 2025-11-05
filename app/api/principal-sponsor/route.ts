import { type NextRequest, NextResponse } from "next/server"
import { principalSponsors as staticPrincipalSponsors } from "@/content/site"

// You'll need to replace this with your PrincipalSponsor Google Apps Script URL
const PRINCIPAL_SPONSOR_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby41LMYX5wKRLOvm0ZqcKQW9W7Phi3UkhIera210iCxRSX2ujpZUVQTEIolj4Awi27Y4g/exec'

// PrincipalSponsor interface matching the Google Sheets structure
export interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

// GET: Fetch all principal sponsors
export async function GET() {
  try {
    const response = await fetch(PRINCIPAL_SPONSOR_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch principal sponsors')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error fetching principal sponsors:', error)
    // Fallback to static content transformed to API shape
    const fallback = staticPrincipalSponsors.map((item) => {
      const isFemaleOnly = item.spouse === undefined || item.spouse === ''
      const femaleLooksLike = item.name?.toLowerCase().includes('mrs') || item.name?.toLowerCase().includes('ms')
      const maleLooksLike = item.name?.toLowerCase().includes('mr') || item.name?.toLowerCase().includes('engr') || item.name?.toLowerCase().includes('honorable')

      const male = isFemaleOnly
        ? ''
        : item.name
      const female = isFemaleOnly
        ? item.name
        : item.spouse || ''

      // If heuristics indicate the name is male and spouse missing, keep as male
      const normalized: PrincipalSponsor = {
        MalePrincipalSponsor: maleLooksLike && !femaleLooksLike ? item.name : male,
        FemalePrincipalSponsor: femaleLooksLike && isFemaleOnly ? item.name : female,
      }
      return normalized
    }) as PrincipalSponsor[]

    return NextResponse.json(fallback, { status: 200 })
  }
}

// POST: Add a new principal sponsor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { MalePrincipalSponsor, FemalePrincipalSponsor } = body

    // Validation
    if (!MalePrincipalSponsor || typeof MalePrincipalSponsor !== 'string') {
      return NextResponse.json(
        { error: 'MalePrincipalSponsor is required' },
        { status: 400 }
      )
    }

    const sponsorData = {
      MalePrincipalSponsor: MalePrincipalSponsor.trim(),
      FemalePrincipalSponsor: FemalePrincipalSponsor?.trim() || '',
    }

    const response = await fetch(PRINCIPAL_SPONSOR_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sponsorData),
    })

    if (!response.ok) {
      throw new Error('Failed to add principal sponsor')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error adding principal sponsor:', error)
    return NextResponse.json(
      { error: 'Failed to add principal sponsor' },
      { status: 500 }
    )
  }
}

// PUT: Update an existing principal sponsor
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { MalePrincipalSponsor, FemalePrincipalSponsor, originalName } = body

    // Validation
    if (!MalePrincipalSponsor || typeof MalePrincipalSponsor !== 'string') {
      return NextResponse.json(
        { error: 'MalePrincipalSponsor is required' },
        { status: 400 }
      )
    }

    const updateData = {
      action: 'update',
      originalName: originalName || MalePrincipalSponsor, // Use originalName for lookup, MalePrincipalSponsor for update
      MalePrincipalSponsor: MalePrincipalSponsor.trim(),
      FemalePrincipalSponsor: FemalePrincipalSponsor?.trim() || '',
    }

    const response = await fetch(PRINCIPAL_SPONSOR_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error('Failed to update principal sponsor')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error updating principal sponsor:', error)
    return NextResponse.json(
      { error: 'Failed to update principal sponsor' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a principal sponsor
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { MalePrincipalSponsor } = body

    // Validation
    if (!MalePrincipalSponsor || typeof MalePrincipalSponsor !== 'string') {
      return NextResponse.json(
        { error: 'MalePrincipalSponsor is required' },
        { status: 400 }
      )
    }

    const deleteData = {
      action: 'delete',
      MalePrincipalSponsor: MalePrincipalSponsor.trim(),
    }

    const response = await fetch(PRINCIPAL_SPONSOR_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    })

    if (!response.ok) {
      throw new Error('Failed to delete principal sponsor')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error deleting principal sponsor:', error)
    return NextResponse.json(
      { error: 'Failed to delete principal sponsor' },
      { status: 500 }
    )
  }
}

