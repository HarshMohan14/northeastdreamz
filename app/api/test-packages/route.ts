import { NextRequest, NextResponse } from 'next/server'
import { PACKAGE_DATA } from '@/lib/data'

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      packageDataExists: typeof PACKAGE_DATA !== 'undefined',
      packageCount: PACKAGE_DATA?.length || 0,
      isArray: Array.isArray(PACKAGE_DATA),
      firstPackage: PACKAGE_DATA?.[0] ? {
        name: PACKAGE_DATA[0].name,
        state: PACKAGE_DATA[0].state,
        hasPdfUrl: !!PACKAGE_DATA[0].pdfUrl,
      } : null,
      allPackageNames: PACKAGE_DATA?.map(p => p.name) || [],
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Test failed',
        message: error?.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}
